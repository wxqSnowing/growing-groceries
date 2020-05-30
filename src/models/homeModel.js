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


    },

    reducers: {
        getSearchData(state, action) {
            return {...state, searchResult: action.payload.data || {} };
        },
        getSiderImageData(state, action) {
            return {...state, siderInfoResult: action.payload.data || {} };
        },
    },
};
export default homeModel;