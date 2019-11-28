import Api from '@/api/report.js';
import Transform from '@/utils/transform.js';

export default {
    namespace: 'reportStatic',
    state: {
        // 搜索关键字
        searchValue: undefined,
        // 异常状态数据
        exceptionInfo: null,
        // active shipment 数据
        activeShipment: null,
        // 预警趋势日报
        daliyAlertInfo: null,
        // 海运预警
        seaAlertInfo: null,
    },

    effects: {
        *getShipmentExceptionInfo({ payload }, { call, put, select }) {
            const searchValue = yield select(state => state.reportStatic.searchValue);
            // eslint-disable-next-line no-param-reassign
            payload.customer_code = searchValue;

            const result = yield call(Api.getShipExceptionInfo, payload);
            const { data } = result;
            yield put({
                type: 'saveShipException',
                payload: {
                    exceptionInfo: Transform.toShipmentExceptionInfo(data),
                },
            });
            const obj = {
                exceptionInfo: Transform.toShipmentExceptionInfo(data),
            };
            return new Promise(resolve => {
                resolve(obj);
            });
        },
        *get_activeShipment({ payload }, { call, put, select }) {
            const searchValue = yield select(state => state.reportStatic.searchValue);
            // eslint-disable-next-line no-param-reassign
            payload.customer_code = searchValue;

            const rest = yield call(Api.getActiveShipInfo, payload);
            const { success, data } = rest;
            if (success) {
                yield put({ type: 'saveData', payload: { activeShipment: data } });
            }
        },

        *get_daliyAlertInfo({ payload }, { call, put, select }) {
            const searchValue = yield select(state => state.reportStatic.searchValue);
            // eslint-disable-next-line no-param-reassign
            payload.customer_code = searchValue;

            const rest = yield call(Api.getDailyAlertInfo, payload);
            const { success, data } = rest;
            if (success) {
                yield put({ type: 'saveData', payload: { daliyAlertInfo: data } });
            }
        },

        *get_seaAlertInfo({ payload }, { call, put, select }) {
            const searchValue = yield select(state => state.reportStatic.searchValue);
            // eslint-disable-next-line no-param-reassign
            payload.customer_code = searchValue;

            const { success, data } = yield call(Api.getSeaAlertInfo, payload);
            if (success) {
                yield put({ type: 'saveData', payload: { seaAlertInfo: data } });
            }
        },
    },

    reducers: {
        saveShipException(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        saveData(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};
