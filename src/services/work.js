import request from 'umi-request';

export async function getWorkDetail(id) {
    console.log(id, '1----id');

    return request(`/api/getWorkDetail?id=${id}`);
}