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

//查询作品create
export async function getWorkInfo(params) {
    let type = params.type;
    return request(`/api/get_work_info?type=${type}`);
}

//查询作品rank
export async function getWorkInfoByRank(params) {
    let type = params.type;
    return request(`/api/get_work_info_by_rank?type=${type}`);
}

//查询作品recommand
export async function getWorkInfoByRecommend(params) {
    let type = params.type;
    return request(`/api/get_work_info_by_recommend?type=${type}`);
}