import request from '@/utils/request';

export default {
    // 海运表单接口
    getSeaExcepList: (data => {
        return request.init({
            url: '/sea/anomaly/page-search',
            data,
            method: 'post',
        });
    }),
    // 海运异常列表更新接口
    getSeaUpdataInformation: (data => {
        return request.init({
            url: '/sea/anomaly/suggestive-emergency-warning',
            data,
            method: 'get',
        });
    }),
    // 海运导出文件接口
    getSeaExport: (data => {
        return request.init({
            url: '/sea/anomaly/export',
            data,
            method: 'post',
        });
    }),
    // 海运导出文件总数接口
    getSeaAll: (data => {
        return request.init({
            url: '/sea/anomaly/count',
            data,
            method: 'post',
        });
    }),
    // 空运表单接口
    getAirExcepList: (data => {
        return request.init({
            url: '/air/anomaly/page-search',
            data,
            method: 'post',
        });
    }),
    // 空运异常列表接口
    getAirUpdataInformation: (data => {
        return request.init({
            url: '/air/anomaly/suggestive-emergency-warning',
            data,
            method: 'get',
        });
    }),
    // 获取空运节点下拉框参数接口
    getAirSelectionParameter: ((data, url) => {
        return request.init({
            url,
            // data,
            method: 'get',
        });
    }),
    // 查看运输阶段接口
    getTransport: (data => {
        return request.init({
            url: `/milestone-definition/search/${data}`,
            method: 'get',
        });
    }),
    // 查看空运数据总量
    getAirAll: (data => {
        return request.init({
            url: '/air/anomaly/count',
            method: 'post',
            data,
        });
    }),
    // 查看空运test
    getTest: (() => {
        return request.init({
            url: '/milestone-definition/search',
            method: 'get',
        });
    }),
};
