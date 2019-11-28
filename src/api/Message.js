import request from '@/utils/request';

export default {
    // 消息列表
    getMsgList: (data => {
        return request.init({
            url: '/dialog/getUserDialogByPage',
            type: 'msg',
            method: 'post',
            data,
        });
    }),

    // /imUsers/username/{username} 通过username查询单个Im用户
    username: (username => {
        return request.init({
            url: `/imUsers/${username}`,
            method: 'get',
            type: 'msg',
        });
    }),

    // /group/createGroup 创建并返回群组信息
    createGroup: (data => {
        return request.init({
            url: '/group/createGroup',
            method: 'post',
            data,
            type: 'msg',
        });
    }),

    // /group/getGroupByGroupId/{groupId} 根据groupId查询群组信息

    getGroupByGroupId: (groupId => {
        return request.init({
            url: `/group/getGroupByGroupId/${groupId}`,
            method: 'get',
            type: 'msg',
        });
    }),


    // mark标识更新
    getMarkList: (data => {
        return request.init({
            url: '/dialog/updateMark',
            type: 'msg',
            method: 'post',
            data,
        });
    }),
};
