import request from '@/utils/request';

function getFilenameFromContentDispositionHeader(contentDisposition) {
    // This parser is designed to be tolerant and accepting of headers that do
    // not comply with the standard, but accepted by Firefox.

    let needsEncodingFixup = true;

    // filename*=ext-value ("ext-value" from RFC 5987, referenced by RFC 6266).
    let tmp = toParamRegExp('filename\\*', 'i').exec(contentDisposition);
    if (tmp) {
        const tmpN = tmp[1];
        let filename = rfc2616unquote(tmpN);
        filename = unescape(filename);
        filename = rfc5987decode(filename);
        filename = rfc2047decode(filename);
        return fixupEncoding(filename);
    }

    // Continuations (RFC 2231 section 3, referenced by RFC 5987 section 3.1).
    // filename*n*=part
    // filename*n=part
    tmp = rfc2231getparam(contentDisposition);
    if (tmp) {
        // RFC 2047, section
        const filename = rfc2047decode(tmp);
        return fixupEncoding(filename);
    }

    // filename=value (RFC 5987, section 4.1).
    tmp = toParamRegExp('filename', 'i').exec(contentDisposition);
    if (tmp) {
        const tmpN = tmp[1];
        let filename = rfc2616unquote(tmpN);
        filename = rfc2047decode(filename);
        return fixupEncoding(filename);
    }
    return '';

    function toParamRegExp(attributePattern, flags) {
        return new RegExp(
            `(?:^|;)\\s*${attributePattern}\\s*=\\s*`
            // Captures: value = token | quoted-string
            // (RFC 2616, section 3.6 and referenced by RFC 6266 4.1)
            + '('
            + '[^";\\s][^;\\s]*'
            + '|'
            + '"(?:[^"\\\\]|\\\\"?)+"?'
            + ')', flags);
    }

    function textdecode(encoding, value) {
        let valueN = value;
        if (encoding) {
            try {
                const decoder = new TextDecoder(encoding, {
                    fatal: true,
                });
                const bytes = Array.from(value, c => c.charCodeAt(0));
                if (bytes.every(code => code <= 0xFF)) {
                    valueN = decoder.decode(new Uint8Array(bytes));
                    needsEncodingFixup = false;
                }
            } catch (e) {
                // TextDecoder constructor threw - unrecognized encoding.
            }
        }
        return valueN;
    }

    function fixupEncoding(value) {
        let valueN = value;
        if (needsEncodingFixup && /[\x80-\xff]/.test(value)) {
            // Maybe multi-byte UTF-8.
            valueN = textdecode('utf-8', value);
            if (needsEncodingFixup) {
                // Try iso-8859-1 encoding.
                valueN = textdecode('iso-8859-1', value);
            }
        }
        return valueN;
    }

    function rfc2231getparam(contentDis) {
        const matches = [];

        let match;
        // Iterate over all filename*n= and filename*n*= with n being an integer
        // of at least zero. Any non-zero number must not start with '0'.
        const iter = toParamRegExp('filename\\*((?!0\\d)\\d+)(\\*?)', 'ig');
        while ((match = iter.exec(contentDis)) !== null) {
            let [n] = match;
            const [quot, part] = match;
            n = parseInt(n, 10);
            if (n in matches) {
                // Ignore anything after the invalid second filename*0.
                if (n === 0) { break; }
                // continue;
            }
            matches[n] = [quot, part];
        }
        const parts = [];
        for (let n = 0; n < matches.length; ++n) {
            if (!(n in matches)) {
                // Numbers must be consecutive. Truncate when there is a hole.
                break;
            }
            let [part] = matches[n];
            const [quot] = matches[n];
            part = rfc2616unquote(part);
            if (quot) {
                part = unescape(part);
                if (n === 0) {
                    part = rfc5987decode(part);
                }
            }
            parts.push(part);
        }
        return parts.join('');
    }

    function rfc2616unquote(value) {
        let valueN = value;
        if (value.startsWith('"')) {
            const parts = value.slice(1).split('\\"');
            // Find the first unescaped " and terminate there.
            for (let i = 0; i < parts.length; ++i) {
                const quotindex = parts[i].indexOf('"');
                if (quotindex !== -1) {
                    parts[i] = parts[i].slice(0, quotindex);
                    parts.length = i + 1; // Truncates and stop the iteration.
                }
                parts[i] = parts[i].replace(/\\(.)/g, '$1');
            }
            valueN = parts.join('"');
        }
        return valueN;
    }

    function rfc5987decode(extvalue) {
        // Decodes "ext-value" from RFC 5987.
        const encodingend = extvalue.indexOf('\'');
        if (encodingend === -1) {
            // Some servers send "filename*=" without encoding'language' prefix,
            // e.g. in https://github.com/Rob--W/open-in-browser/issues/26
            // Let's accept the value like Firefox (57) (Chrome 62 rejects it).
            return extvalue;
        }
        const encoding = extvalue.slice(0, encodingend);
        const langvalue = extvalue.slice(encodingend + 1);
        // Ignore language (RFC 5987 section 3.2.1, and RFC 6266 section 4.1 ).
        const value = langvalue.replace(/^[^']*'/, '');
        return textdecode(encoding, value);
    }

    function rfc2047decode(value) {
        // We are more strict and only recognize RFC 2047-encoding if the value
        // starts with "=?", since then it is likely that the full value is
        // RFC 2047-encoded.

        // Firefox also decodes words even where RFC 2047 section 5 states:
        // "An 'encoded-word' MUST NOT appear within a 'quoted-string'."

        // eslint-disable-next-line no-control-regex
        if (!value.startsWith('=?') || /[\x00-\x19\x80-\xff]/.test(value)) {
            return value;
        }
        // RFC 2047, section 2.4
        // encoded-word = "=?" charset "?" encoding "?" encoded-text "?="
        // charset = token (but let's restrict to characters that denote a
        //           possibly valid encoding).
        // encoding = q or b
        // encoded-text = any printable ASCII character other than ? or space.
        //                ... but Firefox permits ? and space.
        return value.replace(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g,
            (_, charset, encoding, text) => {
                let textN = text;
                if (encoding === 'q' || encoding === 'Q') {
                    // RFC 2047 section 4.2.
                    textN = text.replace(/_/g, ' ');
                    textN = text.replace(/=([0-9a-fA-F]{2})/g,
                        (_b, hex) => String.fromCharCode(parseInt(hex, 16)));
                    return textdecode(charset, text);
                } // else encoding is b or B - base64 (RFC 2047 section 4.1)
                try {
                    textN = atob(text);
                } catch (e) {
                    console.log(e);
                }
                return textdecode(charset, textN);
            });
    }
}

function downloadFn({
    url, params = {}, name = `file_${new Date().getTime()}`, method = 'get',
}) {
    return new Promise((resolve, reject) => {
        request.init({
            url,
            responseType: 'blob',
            data: {
                ...params,
                // fetchType: 'download',
            },
            method: method || 'get',
        }).then(res => {
            const blob = new Blob([res]);
            console.log('blob', blob);
            const fileName = name || getFilenameFromContentDispositionHeader(res.headers['content-disposition']);
            if ('download' in document.createElement('a')) {
                // 非IE下载
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
            }

            resolve(fileName);
        }).catch(err => {
            reject(err);
        });
    });
}

export default downloadFn;
