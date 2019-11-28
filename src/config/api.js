const apiMap = new Map()
    .set('dev', {
        // host: 'https://dev.sccpcloud.com/api',
        // loginUrl: 'https://co.sccpcloud.com',
        IMUrl: 'https://j1.sccpcloud.com/api-gateway/im-service/',

        host: 'https://j1.sccpcloud.com/api-gateway',
        loginUrl: 'https://j1.sccpcloud.com',

        // host:'https://www.sccpcloud.com/api-gateway',
        // loginUrl: 'https://www.sccpcloud.com',
        redirectUrl: `${window.location.origin}/control-tower-fe/#/app`,
        appkey: '1105191012090322#sccp-pro',
        disabledIM: false,
    })
    .set('mock', {
        // host: 'https://dev.sccpcloud.com/api',
        // loginUrl: 'https://co.sccpcloud.com',

        host: 'http://rap2api.taobao.org/app/mock/236396',
        loginUrl: 'https://j1.sccpcloud.com',

        // host:'https://www.sccpcloud.com/api-gateway',
        // loginUrl: 'https://www.sccpcloud.com',
        redirectUrl: `${window.location.origin}/control-tower-fe/#/app`
    })
    // 本地访问sit
    // .set('dev', {
    //     host: 'https://j1.sccpcloud.com/api-gateway',
    //     loginUrl: 'https://j1.sccpcloud.com',
    //     redirectUrl: `${window.location.origin}/ct/#/app`
    // })
    .set('prod', {
        host: 'https://j1.sccpcloud.com/api-gateway',
        loginUrl: 'https://j1.sccpcloud.com',
        IMUrl: 'https://www.sccpcloud.com/api-gateway/im-service/',
        redirectUrl: `${window.location.origin}/ct/#/app`,
        appkey: '1105191012090322#sccp',
        disabledIM: false,
    })
    .set('sit', {
        host: 'https://j1.sccpcloud.com/api-gateway',
        loginUrl: 'https://j1.sccpcloud.com',
        redirectUrl: `${window.location.origin}/ct/#/app`,
        IMUrl: 'https://j1.sccpcloud.com/api-gateway/im-service/',
        appkey: '1105191012090322#sccp-sit',
        disabledIM: false,
    })
    .set('uat', {
        host: 'https://j2.sccpcloud.com/api-gateway',
        loginUrl: 'https://j2.sccpcloud.com',
        redirectUrl: `${window.location.origin}/ct/#/app`,
        IMUrl: 'https://j2.sccpcloud.com/api-gateway/im-service/',
        appkey: '1105191012090322#sccp-uat',
        disabledIM: false,
    })
    .set('rd', {
        host: 'https://j1.sccpcloud.com/api-gateway',
        loginUrl: 'https://j1.sccpcloud.com',
        redirectUrl: `${window.location.origin}/ct/#/app`
    })

const env = process.env.REACT_APP_SECRET_BUILD_TYPE;
const apiJSON = apiMap.get(env);
export const api = apiJSON.host; // control-tower-service
export const { IMUrl, appkey, disabledIM } = apiJSON;
export const tokenApi = apiJSON.host;
// 此处需优化 TODO
export const requestControllerType = {
    default: env !== "mock" ? '/control-tower-service/' : "",
    report: env !== "mock" ? '/control-tower-report/' : "",
    msg: env !== "mock" ? '/im-service/' : "",
    shipment: env !== 'mock' ? '/visualization-transportation-service' : '',
}
export const clientId = 'ControlTower';
export const authURL = `${apiJSON.loginUrl}/login?clientId=${clientId}&redirectUrl=${encodeURIComponent(apiJSON.redirectUrl)}&theme=dark#/Login`;
export const similarApi = {
    ct: '/ct/#/app',
    shipment: '/transport/#/app',
    inventory: '/inventory/#/app',
    controltower: '/control-tower-fe/#/app',
};
