import request from 'umi-request';

export async function queryCurrent(params) {
    return request(`/api/queryUser?uid=${params.uid}`);
}