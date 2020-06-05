import request from 'umi-request';

export async function queryCommentByWorkId(params) {
    return request(`/api/query_comment_by_workId?workid=${params.workid}`);
}

//发布评论
export async function publishComment(params) {
    return request('/api/add_comment', {
        method: 'POST',
        data: params,
    });
}