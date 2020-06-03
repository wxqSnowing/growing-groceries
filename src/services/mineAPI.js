import request from 'umi-request';

//我的查询
export async function getMineWorkInfo(params) {
    let uidKey = params.uid;
    return request(`/api/get_mine_work?uid=${uidKey}`);
}

export async function getCurrentUserInfo() {
    return request('/api/currentUserInfo');
}

export async function getTimelineInfo() {
    return request('/api/getTimelineInfo');
}

export async function getSummaryInfo() {
    return request('/api/getSummaryInfo');
}

export async function contentsInfo() {
    return request('/api/contentsInfo');
}