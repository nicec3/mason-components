import request from '../utils/request';

// 新增资讯
export function infoAdd(data) {
  return request({
    url: '/information/infoAdd',
    method: 'post',
    data
  });
}

/**
 * 图片地址
 */
export function uploadOnePhotoUrl() {
  return `${process.env.VUE_APP_BASE_API}/fileManage/uploadImage`
}