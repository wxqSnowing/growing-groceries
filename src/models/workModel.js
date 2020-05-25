import { getWorkDetail } from '@/services/work';

const workModel = {
    namespace: 'workModel',
    state: {
        workData: {}
    },
    effects: {
        * getWorkDetail(_, { call, put }) {
            const response = yield call(getWorkDetail);
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