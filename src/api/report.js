import request from '@/utils/request';

export default {
    // /activeShipment/getOnwayCargo
    // 获取实时在途货量(包含海运、空运、路运)
    getOnwayCargo: ((data) => {
        return request.init({
            type: 'report',
            url: '/activeShipment/getOnwayCargo',
            method: 'post',
            data,
        });
    }),

    // /alert/getSeaAlertInfo
    // 获取海运预警
    getSeaAlertInfo: ((data) => {
        return request.init({
            type: 'report',
            url: '/alert/getSeaAlertInfo',
            method: 'post',
            data,
        });
    }),

    // 获取shipment 状态信息
    getShipStatusInfo: (data => {
        return request.init({
            type: 'report',
            url: '/shipmentStatus/getShipmentStatusInfo',
            data,
            method: 'post',
        });
    }),

    // 获取Active Shipment数据
    getActiveShipInfo: (data => {
        const requst = request.init({
            type: 'report',
            url: '/activeShipment/getActiveShipmentAmount',
            data,
            method: 'post',
        });
        return requst;
    }),

    // 获取shipment 异常状态数据
    getShipExceptionInfo: (data => {
        return request.init({
            type: 'report',
            url: '/shipmentStatus/getShipmentExceptionInfo',
            data,
            method: 'post',
        });
    }),

    // /alert/getDailyAlertInfo 左上角
    // 获取预警趋势日报
    getDailyAlertInfo: (data => {
        return request.init({
            type: 'report',
            url: '/alert/getDailyAlertInfo',
            data,
            method: 'post',
        });
    }),

    // /activeShipment/getActiveShipmentAmount
    // 获取Active Shipment数据
    getActiveShipmentAmount: (data => {
        return request.init({
            type: 'report',
            url: '/activeShipment/getActiveShipmentAmount',
            data,
            method: 'post',
        });
    }),
    // /userSearch/getUserSearchSelect
    // 获取用户查询下拉框数据
    getUserSearchSelect: (data => {
        return request.init({
            type: 'report',
            url: '/userSearch/getUserSearchSelect',
            data,
            method: 'post',
        });
    }),

    // topTen

    // getTopTenCustomerInfo 获取Top 10 Customer表数据
    // getTopTenDestinationInfo 获取Top 10 Destination表数据
    // getTopTenOriginsInfo 获取Top 10 Origins表数据

    getTopTenInfo: ((data, inter) => {
        // console.table({ 'TOP Ten 请求接口为:': `/inter/${inter}` });
        return request.init({
            type: 'report',
            url: `/topTen/${inter}`,
            data,
            method: 'post',
        });
    }),


    // tradeLane

    // /tradeLane/getVolumeByTradeLane 获取Volume Per Trade lane表数据
    // /tradeLane/getWaylineInfo 获取航线统计(地图上的箭头)

    getVolumeByTradeLane: (data => {
        return request.init({
            type: 'report',
            url: '/tradeLane/getVolumeByTradeLane',
            data,
            method: 'post',
        });
    }),
};
