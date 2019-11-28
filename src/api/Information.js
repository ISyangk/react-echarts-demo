import request from '@/utils/request';

export default {
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
    // 免租期列表
    getRentPeriodList: (data => {
        return request.init({
            url: '/rent-free-period/page-search',
            method: 'post',
            data,
        });
    }),
    // 免租期数据是否存在
    getRentPeriodisExist: (data => {
        return request.init({
            url: '/rent-free-period/is-exist',
            method: 'get',
            data,
        });
    }),
    // 保存新的免租期
    addRentPeriod: (data => {
        return request.init({
            url: '/rent-free-period/create',
            data,
            method: 'post',
        });
    }),
    // 编辑已有的免租期
    editRentPeriod: (data => {
        return request.init({
            url: '/rent-free-period/edit',
            data,
            method: 'put',
        });
    }),
    // 获取免租期信息
    getRentPeriodDetail: (data => {
        return request.init({
            url: `/rent-free-period/${data}`,
            method: 'get',
        });
    }),
    // 删除免租期
    deleteRentPeriod: (data => {
        return request.init({
            url: `/rent-free-period/${data}`,
            method: 'delete',
        });
    }),
};
