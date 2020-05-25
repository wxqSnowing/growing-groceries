import { getCurrentUserInfo, getTimelineInfo, contentsInfo, getSummaryInfo } from '@/services/home';

const homeModel = {
    namespace: 'homeModel',
    state: {
        userInfoData: {},
        timelineInfoData: [],
        contentsInfoData: {},
        summaryInfoData: []
    },
    effects: {
        * currentUserInfo(_, { call, put }) {
            const response = yield call(getCurrentUserInfo);
            yield put({
                type: 'getUserInfoData',
                payload: response,
            });
        },
        * getTimelineInfo(_, { call, put }) {
            const response = yield call(getTimelineInfo);
            yield put({
                type: 'getTimelineInfoData',
                payload: response,
            });
        },
        * getSummaryInfo(_, { call, put }) {
            const response = yield call(getSummaryInfo);
            yield put({
                type: 'getSummaryInfoData',
                payload: response,
            });
        },
        * contentsInfo(_, { call, put }) {
            const response = yield call(contentsInfo);
            yield put({
                type: 'getContentsInfoData',
                payload: response,
            });
        },
    },
    reducers: {
        getUserInfoData(state, action) {
            return {...state, userInfoData: action.payload || {} };
        },
        getTimelineInfoData(state, action) {
            return {...state, timelineInfoData: action.payload || {} };
        },
        getContentsInfoData(state, action) {
            return {...state, contentsInfoData: action.payload || {} };
        },
        getSummaryInfoData(state, action) {
            return {...state, summaryInfoData: action.payload || {} };
        },
    },
};
export default homeModel;