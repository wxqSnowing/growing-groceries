import { aTest, add } from '@/services/test';

const testModel = {
    namespace: 'testModel',
    state: {
        result: {},
        postRes: {},
    },
    effects: {
        * aTest({ payload }, { call, put }) {
            const response = yield call(aTest, payload);
            yield put({
                type: 'getAtest',
                payload: response,
            });
        },
        * add({ payload }, { call, put }) {
            const response = yield call(add, payload);
            yield put({
                type: 'getPost',
                payload: response,
            });
        },
    },
    reducers: {
        getAtest(state, action) {
            return {...state, result: action.payload || {} };
        },
        getPost(state, action) {
            return {...state, postRes: action.payload || {} };
        },
    },
};
export default testModel;