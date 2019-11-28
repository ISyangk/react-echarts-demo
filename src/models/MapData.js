import Api from '@/api/Information.js';
import List from './mapList';

export default {
    namespace: 'mapData',
    state: {
        mapList: List,
    },

    effects: {
        *getMapList({ payload }, { call, put, select }) {
            const mapData = yield select(state => state.mapData);
            const { mapList } = mapData;

            if (!mapList && mapList.length === 0) {
                const { data } = yield call(Api.getRentPeriodList, payload);
                yield put({
                    type: 'save',
                    payload: {
                        mapList: data.rentFreePeriods,
                    },
                });
            }
        },
        *saveState({ payload }, { put }) {
            yield put({ type: 'save', payload });
        },
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },

};
