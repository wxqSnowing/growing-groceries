import * as HomeAPI from '@/services/homeAPI';

const homeModel = {
    namespace: 'homeModel',
    state: {

        messageData: [],
        historyData: [],
        imagesData: [],
        //start
        searchResult: [],
        siderInfoResult: [],
        workData: [],
        publishResult: '',
    },

    effects: {
        * search({ payload }, { call, put }) {
            const response = yield call(HomeAPI.searchAPI, payload);
            yield put({
                type: 'getSearchData',
                payload: response,
            });
        },

        * getSiderInfo({ payload }, { call, put }) {
            const response = yield call(HomeAPI.getSiderInfo, payload);
            yield put({
                type: 'getSiderImageData',
                payload: response,
            });
        },

        * getWorkInfo({ payload }, { call, put }) {
            const response = yield call(HomeAPI.getWorkInfo, payload);
            yield put({
                type: 'getWorkData',
                payload: response,
            });
        },

        * publishWork({ payload }, { call, put }) {
            const response = yield call(HomeAPI.publishWork, payload);
            yield put({
                type: 'publishResultData',
                payload: response,
            });
        },

    },

    reducers: {
        getSearchData(state, action) {
            return {...state, searchResult: action.payload.data || {} };
        },

        getSiderImageData(state, action) {
            return {...state, siderInfoResult: action.payload.data || {} };
        },

        getWorkData(state, action) {
            return {...state, workData: action.payload.data || {} };
        },

        publishResultData(state, action) {
            return {...state, publishResult: action.payload.message || {} };
        },
    },
};
export default homeModel;