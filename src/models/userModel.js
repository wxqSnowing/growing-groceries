import * as userAPI from '@/services/userAPI';

const UserModel = {
    namespace: 'userModel',
    state: {
        userInfoData: {},
    },
    effects: {
        * queryCurrent({ payload }, { call, put }) {
            const response = yield call(userAPI.queryCurrent, payload);
            yield put({
                type: 'getCurrentUser',
                payload: response,
            });
        },
    },
    reducers: {
        getCurrentUser(state, action) {
            return {...state, userInfoData: action.payload.data || {} };
        },
    },
};
export default UserModel;