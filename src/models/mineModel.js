// import { getCurrentUserInfo, getTimelineInfo, contentsInfo, getSummaryInfo } from '@/services/home';

import * as mineAPI from '@/services/mineAPI';

const mineModel = {
    namespace: 'mineModel',
    state: {
        userInfoData: {},
        timelineInfoData: [],
        contentsInfoData: {},
        summaryInfoData: [],
        //
        mineWorkData: [],
    },
    effects: {
        * getMineWork({ payload }, { call, put }) {
            const response = yield call(mineAPI.getMineWorkInfo, payload);
            yield put({
                type: 'getMineWorkData',
                payload: response,
            });
        },

        * currentUserInfo(_, { call, put }) {
            const response = yield call(mineAPI.getCurrentUserInfo);
            yield put({
                type: 'getUserInfoData',
                payload: response,
            });
        },
        * getTimelineInfo(_, { call, put }) {
            const response = yield call(mineAPI.getTimelineInfo);
            yield put({
                type: 'getTimelineInfoData',
                payload: response,
            });
        },
        * getSummaryInfo(_, { call, put }) {
            const response = yield call(mineAPI.getSummaryInfo);
            yield put({
                type: 'getSummaryInfoData',
                payload: response,
            });
        },
        * contentsInfo(_, { call, put }) {
            const response = yield call(mineAPI.contentsInfo);
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

        getMineWorkData(state, action) {
            return {...state, mineWorkData: action.payload.data || {} };
        },
    },
};
export default mineModel;