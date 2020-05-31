import request from 'umi-request';

//发布作品
export async function publishWork(params) {
    return request('/api/add_work', {
        method: 'POST',
        data: params,
    });
}
//上传封面图
export async function uploadWorkImage(params) {
    return request('/api/add_work_image', {
        method: 'POST',
        data: params,
    });
}