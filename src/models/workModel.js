import * as WorkAPI from '@/services/workAPI';
import { message } from 'antd';

const workModel = {
    namespace: 'workModel',
    state: {
        // workData: {},
        //----
        publishResult: '',
        uploadWorkImageResult: '',
    },
    effects: {
        // * getWorkDetail({ payload }, { call, put }) {
        //     let id = payload.id;
        //     const response = yield call(WorkAPI.getWorkDetail, id);
        //     yield put({
        //         type: 'getWorkDetailData',
        //         payload: response,
        //     });
        // },

        * publishWork({ payload }, { call, put }) {
            const response = yield call(WorkAPI.publishWork, payload);
            yield put({
                type: 'publishResultData',
                payload: response,
            });
        },

        * uploadWorkImage({ payload }, { call, put }) {
            const response = yield call(WorkAPI.uploadWorkImage, payload);
            yield put({
                type: 'uploadWorkImageData',
                payload: response,
            });
        },

    },
    reducers: {
        // getWorkDetailData(state, action) {
        //     return {...state, workData: action.payload || {} };
        // },
        publishResultData(state, action) {
            if (action.payload.success) {
                message.success(action.payload.message);
            }
            return {...state, publishResult: action.payload.success || {} };
        },
        uploadWorkImageData(state, action) {
            if (action.payload.success) {
                message.success(action.payload.message);
            }
            return {...state, uploadWorkImageResult: action.payload.url || {} };
        },
    },
};
export default workModel;