import Api from '@/api/report.js';
import Transform from '@/utils/transform.js';

export default {
    namespace: 'reportDetail',
    state: {
        statusInfo: {},
        activeShipInfo: {},
    },

    effects: {
        *getShipmentStatusInfo({ payload }, { call, put }) {
            const result = yield call(Api.getShipStatusInfo, payload);
            const { data } = result;
            yield put({
                type: 'saveShipStatus',
                payload: {
                    statusInfo: Transform.toShipmentStatusInfo(data),
                    statusInfoColumn: Transform.getShipmentInfoClomn(data),
                },
            });
            const obj = {
                statusInfo: Transform.toShipmentStatusInfo(data),
                statusInfoColumn: Transform.getShipmentInfoClomn(data),
            };
            return obj;
        },

        *getActiveShipmentInfo({ payload }, { call, put }) {
            const result = yield call(Api.getActiveShipInfo, payload);
            const { data } = result;
            yield put({
                type: 'saveActiveShip',
                payload: {
                    activeShipInfo: data,
                },
            });
            return data;
        },

        // 获取Top 10 表数据
        * getTopTenInfo({ payload, inter }, { call }) {
            const rest = (yield call(Api.getTopTenInfo, payload, inter)).data || [];
            return new Promise((resolve, reject) => {
                try {
                    resolve(Transform.interfaceTopTen(rest));
                } catch (error) {
                    reject(error);
                }
            });
        },

        // tradeLane

        // getVolumeByTradeLane
        * getVolumeByTradeLane({ payload }, { call }) {
            const rest = (yield call(Api.getVolumeByTradeLane, payload)).data || [];
            return new Promise((resolve, reject) => {
                try {
                    resolve(Transform.interfaceTopTen(rest));
                } catch (error) {
                    reject(error);
                }
            });
        },
    },

    reducers: {
        saveShipStatus(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },

        saveActiveShip(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};
