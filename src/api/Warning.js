import request from '@/utils/request';

export default {
    // 海运预警规则查询
    getWarningList: (() => {
        return request.init({
            url: '/sea/milestone-warning-rule/search',
            method: 'get',
        });
    }),
    // 修改海运预警规则
    editWarning: (data => {
        return request.init({
            url: '/sea/milestone-warning-rule/edit',
            method: 'put',
            data,
        });
    }),
    // 获取单个预警规则
    getWarningDetail: (data => {
        return request.init({
            url: `/sea/milestone-warning-rule/${data}`,
            method: 'get',
        });
    }),

    // 空运预警规则查询
    getWarningAirList: (() => {
        return request.init({
            url: '/air/milestone-warning-rule/search',
            method: 'get',
        });
    }),
    // 修改预警规则
    editAirWarning: (data => {
        return request.init({
            url: '/air/milestone-warning-rule/edit',
            method: 'put',
            data,
        });
    }),

};
