import * as WorkAPI from '@/services/workAPI';
import { message } from 'antd';

const workModel = {
    namespace: 'workModel',
    state: {
        workDetailData: {},
        //----
        publishResult: '',
        uploadWorkImageResult: '',
    },
    effects: {
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

        // * uploadWorkImage({ payload }, { call, put }) {
        //     const response = yield call(WorkAPI.uploadWorkImage, payload);
        //     yield put({
        //         type: 'uploadWorkImageData',
        //         payload: response,
        //     });
        // },

    },
    reducers: {
        getWorkDetailData(state, action) {
            return {...state, workDetailData: action.payload.data || {} };
        },

        publishResultData(state, action) {
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