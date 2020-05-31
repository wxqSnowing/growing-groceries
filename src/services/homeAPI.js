import request from 'umi-request';

//搜索
export async function searchAPI(params) {
    let queryKey = params.queryKey;
    return request(`/api/search?queryKey=${queryKey}`);
}

//查询
export async function getSiderInfo() {
    return request('/api/get_sider_info');
}

//查询
export async function getWorkInfo(params) {
    let type = params.type;
    return request(`/api/get_work_info?type=${type}`);
}