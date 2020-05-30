import request from 'umi-request';

//查询
export async function searchAPI(params) {
    let queryKey = params.queryKey;
    return request(`/api/search?queryKey=${queryKey}`);
}