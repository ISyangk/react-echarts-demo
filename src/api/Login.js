import request from '@/utils/request';
import { clearTokenFn } from '@/utils/fn';
import { tokenApi } from '@/config/api';

export default {
    // 统一认证登录
    verificationCode: (code => {
        return request.init({
            url: `${tokenApi}/authentication/getToken/${code}`,
            responseType: 'getToken',
            method: 'get',
        });
    }),
    getUserInfo: (data => {
        return request.init({
            url: `${tokenApi}/user/getUserInfo`,
            data,
            method: 'post',
        });
    }),
    goLogin: (data => {
        clearTokenFn();
        return request.init({
            url: '/auth/loginIn',
            data,
            method: 'post',
        });
    }),
    // 查询角色菜单
    getUserMenu: (() => {
        return request.init({
            url: '/basic-data/user-menu',
            method: 'get',
        });
    }),
};
