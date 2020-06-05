import * as commentAPI from '@/services/commentAPI';
import { message } from 'antd';

const commentModel = {
    namespace: 'commentModel',
    state: {
        commentData: {},
        publishResult: '',
    },
    effects: {
        * queryCommentByWorkId({ payload }, { call, put }) {
            const response = yield call(commentAPI.queryCommentByWorkId, payload);
            yield put({
                type: 'getCommentData',
                payload: response,
            });
        },

        * publishCommentByWorkId({ payload }, { call, put }) {
            const response = yield call(commentAPI.publishComment, payload);
            yield put({
                type: 'getPublishCommentResult',
                payload: response,
            });
        },
    },
    reducers: {
        getCommentData(state, action) {
            return {...state, commentData: action.payload.data || {} };
        },

        getPublishCommentResult(state, action) {
            if (action.payload.success) {
                message.success(action.payload.message);
            }
            return {...state, publishResult: action.payload.data || {} };
        },
    },
};
export default commentModel;