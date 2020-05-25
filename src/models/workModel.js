import { getWorkDetail } from '@/services/work';

const workModel = {
    namespace: 'workModel',
    state: {
        workData: {}
    },
    effects: {
        * getWorkDetail({ payload }, { call, put }) {
            let id = payload.id;
            const response = yield call(getWorkDetail, id);
            yield put({
                type: 'getWorkDetailData',
                payload: response,
            });
        },

    },
    reducers: {
        getWorkDetailData(state, action) {
            return {...state, workData: action.payload || {} };
        },
    },
};
export default workModel;