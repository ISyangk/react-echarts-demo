import Api from '@/api/Common.js';

export default {
    namespace: 'common',
    state: {
        AirMilestone: [],
        SeaMilestone: [],
        carrierList: [],
        destinationList: [],
        typeList: {
            SeaMilestone: 'getSeaMilestone',
            AirMilestone: 'getAirMilestone',
            carrierList: 'getCarrierList',
            destinationList: 'getDestinationList',
        },
        pathname: null,
    },
    subscriptions: {
        setup({ dispatch, history }) {
            // 监听路由，发生变化时候就执行浏览器更新事件，使地图始终包含窗口大小
            history.listen(location => {
                dispatch({
                    namespace: 'mapType',
                    type: 'save',
                    payload: {
                        pathname: location.pathname,
                    },
                });
            });
        },
    },

    effects: {
        *getCommonList({ payload = { type: 'SeaMilestone', get: null } }, { call, put, select }) {
            const common = yield select(state => state.common);

            const { get, type } = payload;
            // 防止重复请求，如果没有数据，或者传递一个get=true的时候，就请求
            if (common[type] && (common[type].length === 0 || get)) {
                const { data } = yield call(Api[common.typeList[type]]);
                yield put({
                    type: 'save',
                    payload: {
                        [type]: data || [],
                    },
                });
            }
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
        loading(state) {
            return { ...state, excepLoading: false };
        },
    },
};
