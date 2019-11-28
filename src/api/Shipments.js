import request from '@/utils/request';

export default {
    // 获取shipment表格参数
    getShipmentList: (data => {
        return request.init({
            type: 'shipment',
            url: '/shipment/paging-search',
            data,
            method: 'post',
        });
    }),
    // 获取非租户的表格参数
    getShipmentNonTenant: (data => {
        return request.init({
            type: 'shipment',
            url: '/shipment/non-tenant/paging-search',
            method: 'post',
            data,
        });
    }),
    // 获取shipment下载文件流
    getDownloadAddress: (data => {
        return request.init({
            type: 'shipment',
            url: '/shipment/export-excel',
            method: 'post',
            data,
        });
    }),
    // 首页运输数据
    getShipment: (() => {
        return request.init({
            type: 'shipment',
            url: '/shipment/unfinished',
            method: 'get',
        });
    }),

    getShipmentDetail: (data => {
        return request.init({
            type: 'shipment',
            url: `/shipment/details/${data}`,
            method: 'get',
        });
    }),
    // 获取shipmentx下载文件名
    getShipmentFileUrl: (data => {
        return request.init({
            type: 'shipment',
            url: `/file/information/${data.id}`,
            method: 'get',
        });
    }),
    // 获取shiment 运单费用
    getExchange: (data => {
        return request.init({
            type: 'shipment',
            url: `/shipment/cost/${data.id}`,
            method: 'get',
        });
    }),
    // // 获取汇率
    getExchangeRate: (() => {
        return request.init({
            type: 'shipment',
            url: '/basic-data/exchange-rates?page_size=500',
            method: 'get',
        });
    }),
    // 获取container表格参数
    getContainerList: (data => {
        return request.init({
            type: 'shipment',
            url: '/container/paging-search',
            method: 'get',
            data,
        });
    }),
    // 获取pallet表格参数
    getPalletList: (data => {
        return request.init({
            type: 'shipment',
            url: '/pallet/query',
            method: 'get',
            data,
        });
    }),
    // 获取shipment高级搜索参数
    getSearchSeniorParameter: (data => {
        return request.init({
            type: 'shipment',
            url: `/data-dictionary/dictionary-entries/${data.field}`,
            method: 'get',
        });
    }),
    // 获取shipment高级搜索参数多维版
    getSearchSeniorParameterMultidimensional: (data => {
        return request.init({
            type: 'shipment',
            url: `/data-dictionary/synonym-dictionary-entries/${data.field}`,
            method: 'get',
        });
    }),
    getLinesTopFive: (() => {
        return request.init({
            type: 'shipment',
            // TODO: 参数含义未知、暂时写死
            url: '/shipment/busy-line-top?modeCode=TPM_SEA&number=5',
            method: 'get',
        });
    }),
};
