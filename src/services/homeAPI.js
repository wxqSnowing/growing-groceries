import request from 'umi-request';

//搜索
export async function searchAPI(params) {
    let queryKey = params.queryKey;
    return request(`/api/search?queryKey=${queryKey}`);
}

//获取sider的image信息
export async function getSiderInfo() {
    return request('/api/get_sider_info');
}

//查询作品
export async function getWorkInfo(params) {
    let type = params.type;
    return request(`/api/get_work_info?type=${type}`);
}

//发布作品
export async function publishWork(params) {
    return request('/api/add_work', {
        method: 'POST',
        data: params,
    });
}