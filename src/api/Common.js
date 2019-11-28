import request from '@/utils/request';

export default {
    // 获取海运milestone节点
    getSeaMilestone: (() => {
        return request.init({
            url: '/milestone-definition/search/TPM_SEA',
            method: 'get',
        });
    }),
    // 获取承运商
    getCarrierList: (data => {
        return request.init({
            url: '/carrier/search',
            method: 'get',
            data,
        });
    }),
    // 获取目的地
    getDestinationList: (data => {
        return request.init({
            url: '/destination/search',
            method: 'get',
            data,
        });
    }),

    // 获取空运milestone节点
    getAirMilestone: (data => {
        return request.init({
            url: '/milestone-definition/search/TPM_AIR',
            method: 'get',
            data,
        });
    }),

};
