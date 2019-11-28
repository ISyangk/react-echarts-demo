import commonOpt from '@/config/common';

/* eslint-disable no-continue */
export function deepCopy(value) {
    return JSON.parse(JSON.stringify(value));
}

/**
 * 保存Token等信息
 * @param {*} opt: {token, reToken, user}
 */
export function saveTokenFn(opt = null) {
    return new Promise(resolve => {
        if (opt && opt.token) {
            localStorage.setItem(commonOpt.KshToken, opt.token);
        }
        if (opt && opt.reToken) {
            localStorage.setItem(commonOpt.KshReToken, opt.reToken);
        }
        if (opt && opt.user) {
            localStorage.setItem(commonOpt.KshUser, opt.user);
        }
        resolve();
    });
}
/**
 * 清除Token等信息
 * @param {*} opt: {token, reToken, user}
 */
export function clearTokenFn(opt = null) {
    return new Promise(resolve => {
        if (!opt) {
            localStorage.removeItem(commonOpt.KshToken);
            localStorage.removeItem(commonOpt.KshReToken);
            localStorage.removeItem(commonOpt.KshUser);
        }
        if (opt && opt.token) {
            localStorage.removeItem(commonOpt.KshToken);
        }
        if (opt && opt.reToken) {
            localStorage.removeItem(commonOpt.KshReToken);
        }
        if (opt && opt.user) {
            localStorage.removeItem(commonOpt.KshUser);
        }
        resolve();
    });
}

// 去左右空格;
export function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, '');
}

export function getUrlQuery(href, name) {
    // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
    if (href.indexOf('?') === -1 || href.indexOf(`${name}=`) === -1) {
        return '';
    }
    // 获取链接中参数部分
    const queryString = href.substring(href.indexOf('?') + 1);
    // 分离参数对 ?key=value&key2=value2
    const parameters = queryString.split('&');
    let pos,
        paraName,
        paraValue;
    for (let i = 0; i < parameters.length; i++) {
        // 获取等号位置
        pos = parameters[i].indexOf('=');
        if (pos === -1) {
            continue;
        }
        // 获取name 和 value
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);

        if (paraName === name) {
            return unescape(paraValue.replace(/\+/g, ' '));
        }
    }
    return '';
}

/**
 * tabel序号
 * @param {Number} index 当前行 索引
 * @param {Number} current
 * @param {Number} pageSize
 * return Number
 */
export function serialNumber(index, current, pageSize) {
    return (current - 1) * pageSize + index + 1;
}

/**
 * 金额去除千位分隔符
 * @param {*} num
 */
export function delcommafy(num) {
    let numN = 0;
    if (num !== undefined && num !== null) {
        numN = num.toString();
        numN = num.replace(/[ ]/g, ''); // 去除空格
        numN = num.replace(/,/gi, '');
    }
    return Number(numN);
}

/**
 * 加法
 */
export function accAdd(arg1 = 0, arg2 = 0) {
    let arg1N = arg1;
    let arg2N = arg2;
    let r1,
        r2;
    try {
        r1 = arg1N.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    } try {
        r2 = arg2N.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }

    const c = Math.abs(r1 - r2);

    const m = 10 ** Math.max(r1, r2);

    if (c > 0) {
        const cm = (10 ** c); if (r1 > r2) {
            arg1N = Number(arg1N.toString().replace('.', ''));

            arg2N = Number(arg2N.toString().replace('.', '')) * cm;
        } else {
            arg1N = Number(arg1N.toString().replace('.', '')) * cm;

            arg2N = Number(arg2N.toString().replace('.', ''));
        }
    } else {
        arg1N = Number(arg1N.toString().replace('.', ''));

        arg2N = Number(arg2N.toString().replace('.', ''));
    } return (arg1N + arg2N) / m;
}
// 千位符转换
export function transportThousand(num) {
    if (Number(num) || num instanceof Number || Number(num) === 0) {
        let newNum = Math.ceil(num);
        let result = '';
        let counter = 0;
        newNum = (newNum || 0).toString();
        for (let i = newNum.length - 1; i >= 0; i--) {
            counter++;
            result = newNum.charAt(i) + result;
            if (!(counter % 3) && i !== 0 && (newNum.length % 3 || newNum.length)) {
                result = `,${result}`;
            }
        }
        return result;
    } else {
        return ' ';
    }
}
// 截取字符串长度
export function subStr(str, strLength) {
    const newStr = str;
    if (newStr && typeof (newStr) === 'string' && !strLength) {
        if (newStr.length > 8) {
            const newSubStr = `${newStr.substring(0, 7)}...`;
            return newSubStr;
        }
    } else if ((newStr && typeof (newStr) === 'string') && (strLength || strLength === 0) && newStr.length < 6) {
        return newStr;
    } else if ((newStr && typeof (newStr) === 'string') && (strLength || strLength === 0)) {
        if (newStr.length > strLength) {
            const newSubStr = `${newStr.substring(0, strLength)}...`;
            return newSubStr;
        } else {
            return newStr;
        }
    }
}
// 转换成百分比
export function conversionPercentage(num, symbol = '%') {
    const numN = Number(num);
    if (typeof (numN) === 'number' && numN.toString().indexOf('.') >= 0) {
        const newNum = numN.toString();
        const decimal = newNum.substring(newNum.indexOf('.') + 1);
        if (decimal.length >= 2) {
            const newDecimal = `${newNum.substring(0, newNum.indexOf('.'))}.${decimal.substring(0, 2)}${symbol}`;
            return newDecimal;
        } else if (decimal.length > 0 && decimal.length < 2) {
            const newDecimal = `${newNum.substring(0, newNum.indexOf('.'))}.${decimal}0${symbol}`;
            return newDecimal;
        }
    } else if (numN === '0' || numN === 0) {
        return numN;
    } else if (typeof (numN) === 'number' && numN.toString().indexOf('.') < 0) {
        return `${numN}${symbol}`;
    } else {
        console.log('请传入Number类型', numN, typeof (numN) === 'number');
    }
}

// 获取地图需要的语言包
export function getMapLang() {
    const langLocal = JSON.parse(localStorage.getItem(commonOpt.lang));
    console.log(langLocal);
    return {
        defaultLanguage: (langLocal && langLocal.map) ? langLocal.map : 'en',
    };
}
