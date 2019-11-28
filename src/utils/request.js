import axios from 'axios';
import { api, clientId, requestControllerType } from '@/config/api';
import { message, Modal } from 'antd';

import commonOpt from '@/config/common';
import { clearTokenFn } from '@/utils/fn';

const BASE_URL = api;

const errCodes = [
    'IM_USER_NOT_FOUND_ERROR',
];
class Request {
    constructor() {
        this.axiosConfig = {};

        this.Axios = axios.create({
            baseURL: BASE_URL,
        });
        this.requestInterceptors();
        this.responseInterceptors();
    }

    requestInterceptors() {
        this.Axios.interceptors.request.use(
            config => {
                const accessToken = localStorage.getItem(commonOpt.KshToken);
                const currentConfig = { ...config };
                if (accessToken) {
                    currentConfig.headers.Authorization = accessToken;
                    currentConfig.headers.clientId = clientId;
                }
                if (currentConfig.headers.methodType && currentConfig.headers.methodType === 'from') {
                    currentConfig.headers['Content-type'] = 'application/x-www-form-urlencoded';
                    currentConfig.params = con.data;
                }
                console.log('请求参数=> ', currentConfig);
                return currentConfig;
            },
            err => {
                return Promise.reject(err);
            },
        );
    }

    responseInterceptors() {
        this.Axios.interceptors.response.use(
            response => {
                const { data, config } = response;
                if (config && config.responseType && (config.responseType === 'blob' || config.responseType === 'getToken')) {
                    return Promise.resolve(data);
                }
                if (data && data.errorCode && data.errorCode === '403') {
                    Modal.error({
                        title: 'The user is logged in on another computer, Please login again',
                        onOk() {
                            clearTokenFn().then(() => {
                                window.location.reload();
                            });
                        },
                    });
                    return Promise.reject(data);
                } else if (data && data.success) {
                    return Promise.resolve(data);
                }
                // 不存在或者status不是200 表示有错误信息
                if (!data || data.status !== 200) {
                    if (data.status === 401) { // 401登录失效等
                        clearTokenFn().then(() => {
                            window.location.reload();
                        });
                    }
                    if (data.errorCode && errCodes.indexOf(data.errorCode) >= 0) {
                        console.log('data.message');
                    } else {
                        message.error(data.message, 3);
                    }
                    return Promise.reject(data); // 返回接口返回的错误信息
                } else {
                    return Promise.resolve(data);
                }
            },
            // 接口请求失败
            error => {
                console.log('接口错误=》', error);
                const err = { ...error };

                const { config } = err;
                const status = err.response && err.response.status;
                if (status === 401 || (config && config.inRefreshToken)) {
                    clearTokenFn().then(() => {
                        window.location.reload();
                    });
                    return Promise.reject(err); // 返回接口返回的错误信息
                }
                // return Promise.reject(err);

                if (err.response) {
                    const errRes = err.response;
                    err.message = errRes.data && errRes.data.message ? errRes.data.message : err.message;
                    // 这里可以引入相应的弹窗组件来提示错误信息
                }
                message.error(err.message, 3);
                console.log('链接错误：', err.message);
                return Promise.reject(err); // 返回接口返回的错误信息
            },
        );
    }

    init(params) {
        const { type = 'default', url = '' } = params;
        this.axiosConfig = {
            ...params,
            url: url.indexOf('http') === -1 ? `${BASE_URL}${requestControllerType[type]}${url}` : url,
            data: params.method === 'post' || params.method === 'put' ? params.data : null,
            params: params.method === 'get' || params.method === 'delete' ? params.data : null,
        };

        return this.Axios(this.axiosConfig);
    }
}
const requestItem = new Request();

export default requestItem;
