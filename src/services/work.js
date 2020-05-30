import request from 'umi-request';

export async function getWorkDetail(id) {
    return request(`/api/getWorkDetail?id=${id}`);
}