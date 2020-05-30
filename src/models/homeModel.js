import * as HomeAPI from '@/services/homeAPI';

const homeModel = {
    namespace: 'homeModel',
    state: {

        messageData: [],
        historyData: [],
        imagesData: [],
        searchResult: []
    },

    effects: {
        * search({ payload }, { call, put }) {
            const response = yield call(HomeAPI.searchAPI, payload);
            yield put({
                type: 'getSearchData',
                payload: response,
            });
        },

    },
    reducers: {
        getSearchData(state, action) {
            return {...state, searchResult: action.payload.data || {} };
        },
    },
};
export default homeModel;