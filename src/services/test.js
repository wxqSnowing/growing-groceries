import request from 'umi-request';
import { stringify } from 'qs'
export async function aTest(params) {
    return request(`/api/queryUser?${stringify(params)}`);
}

export async function add(params) {
    return request('/api/add', {
        method: 'POST',
        data: params,
    });
}