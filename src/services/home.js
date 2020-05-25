import request from 'umi-request';

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