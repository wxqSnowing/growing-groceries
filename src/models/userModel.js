import * as userAPI from '@/services/userAPI';
import { message } from 'antd';

const UserModel = {
    namespace: 'userModel',
    state: {
        userInfoData: {},
        registerResult: '',
        loginResult: '',
    },
    effects: {
        * queryCurrent({ payload }, { call, put }) {
            const response = yield call(userAPI.queryCurrent, payload);
            yield put({
                type: 'getCurrentUser',
                payload: response,
            });
        },

        * login({ payload }, { call, put }) {
            const response = yield call(userAPI.login, payload);
            yield put({
                type: 'getLoginResult',
                payload: response,
            });
        },

        * register({ payload }, { call, put }) {
            const response = yield call(userAPI.register, payload);
            yield put({
                type: 'getRegisterResult',
                payload: response,
            });
        },
    },
    reducers: {
        getCurrentUser(state, action) {
            return {...state, userInfoData: action.payload.data || {} };
        },

        getLoginResult(state, action) {
            let result = action.payload.success;
            if (!result) {
                message.error(action.payload.message);
            }
            return {...state, loginResult: action.payload };
        },

        getRegisterResult(state, action) {
            message.info(action.payload.message);
            return {...state, registerResult: action.payload.data || {} };
        }
    },
};
export default UserModel;