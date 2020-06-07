import request from 'umi-request';

export async function queryCurrent(params) {
    return request(`/api/queryUser?uid=${params.uid}`);
}

export async function login(params) {
    return request(`/api/login?username=${params.username}&pwd=${params.password}`);
}

export async function register(params) {
    console.log('API------', params);
    return request('/api/add_user', {
        method: 'POST',
        data: params,
    });
}