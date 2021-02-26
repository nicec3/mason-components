import request from "../utils/request";

/**
 * 新增
 * @param data 接口入参
 */
export function sysmanageUserAdd(data) {
  return request({
    url: "/sysmanage/user/userAdd",
    method: "post",
    data
  });
}

/**
 * 删除
 * @param data 接口入参
 */
export function sysmanageUserDelete(data) {
  return request({
    url: "/sysmanage/user/userDelete",
    method: "post",
    data
  });
}

/**
 * 编辑
 * @param data 接口入参
 */
export function sysmanageUserEdit(data) {
  return request({
    url: "/sysmanage/user/userEdit",
    method: "post",
    data
  });
}

/**
 * 查询
 */
export function sysmanageUserList(data) {
  return request({
    url: "/sysmanage/user/userList",
    method: "post",
    data
  });
}
