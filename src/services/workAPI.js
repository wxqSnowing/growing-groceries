import request from 'umi-request';

//发布作品
export async function publishWork(params) {
    return request('/api/add_work', {
        method: 'POST',
        data: params,
    });
}

//查看详情
export async function getWorkDetail(params) {
    return request(`/api/get_work_detail_by_id?workid=${params.workid}`);
}


//删除
export async function delteWorkById(params) {

    return request(`/api/delte_work_by_id?workid=${params.workid}`);
}

//修改作品
export async function updateWork(params) {
    return request('/api/update_work', {
        method: 'POST',
        data: params,
    });
}


// //上传封面图
// export async function uploadWorkImage(params) {
//     return request('/api/add_work_image', {
//         method: 'POST',
//         data: params,
//     });
// }