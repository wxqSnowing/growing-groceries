import * as WorkAPI from '@/services/workAPI';
import { message } from 'antd';

const workModel = {
    namespace: 'workModel',
    state: {
        workDetailData: {},
        //----
        publishResult: '',
        uploadWorkImageResult: '',
        delWorkResult: '',
    },
    effects: {
        * delteWorkById({ payload }, { call, put }) {
            const response = yield call(WorkAPI.delteWorkById, payload);
            yield put({
                type: 'delteWorkByIdResult',
                payload: response,
            });
        },

        * getWorkDetail({ payload }, { call, put }) {
            const response = yield call(WorkAPI.getWorkDetail, payload);
            yield put({
                type: 'getWorkDetailData',
                payload: response,
            });
        },

        * publishWork({ payload }, { call, put }) {
            const response = yield call(WorkAPI.publishWork, payload);
            yield put({
                type: 'publishResultData',
                payload: response,
            });
        },

        * editWork({ payload }, { call, put }) {
            const response = yield call(WorkAPI.updateWork, payload);
            yield put({
                type: 'editResultData',
                payload: response,
            });
        },

        // * uploadWorkImage({ payload }, { call, put }) {
        //     const response = yield call(WorkAPI.uploadWorkImage, payload);
        //     yield put({
        //         type: 'uploadWorkImageData',
        //         payload: response,
        //     });
        // },

    },
    reducers: {
        delteWorkByIdResult(state, action) {
            if (action.payload.success) {
                message.success(action.payload.message);
            }
            return {...state, delWorkResult: action.payload.data || {} };
        },

        getWorkDetailData(state, action) {
            return {...state, workDetailData: action.payload.data || {} };
        },

        publishResultData(state, action) {
            if (action.payload.success) {
                message.success(action.payload.message);
            }
            return {...state, publishResult: action.payload.success || {} };
        },

        editResultData(state, action) {
            if (action.payload.success) {
                message.success(action.payload.message);
            }
            return {...state, publishResult: action.payload.success || {} };
        },

        // uploadWorkImageData(state, action) {
        //     if (action.payload.success) {
        //         message.success(action.payload.message);
        //     }
        //     return {...state, uploadWorkImageResult: action.payload.url || {} };
        // },
    },
};
export default workModel;