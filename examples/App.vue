<template>
  <div class="test">
    <Integration
      :data="modelConf"
      :fieldConfig="fieldConfig"
      @batchList="batchFn"
    >
    </Integration>
  </div>
</template>

<script>
// import { Integration } from "../mason-components/index";
import { Integration } from "wuxibotestmason"; // wuxibotestmason模块
import "wuxibotestmason/lib/wuxibotestmason.css"; // wuxibotestmason样式
// 接口请求
const requestModel = {
  sysmanageUserList: () => {
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: {
          list: [
            {
              id: "DEARSU1233",
              sort: 0,
              phone: "13800138000",
              avater:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606911128215&di=d5140ea91052702fd6a72e5f43caa733&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170211%2F36fc94423a1a41968cfe8627bf98caa5.gif",
              gender: "0",
              username: "superadmin",
              password: "123123",
              roleList: [
                "432985",
                "21e4e5e811b857c1a29d2c8499d3ae1f2972a179",
                "3f3e3940acedd8c72e8122830b89f20d32ef267a",
              ],
              isDelete: "1",
              createDate: "2020-12-01 09:09:02",
              updateDate: "2021-02-22 09:50:52",
            },
            {
              id: "DY_USER60b7c295a4c77c883b407af040f2cf5a4cef2aff",
              sort: 1,
              phone: "13800138006",
              avater: "",
              gender: "0",
              username: "mason123",
              password: "DY_USERdfb59f0c8ff950313b5e348b016c8434aeb441c7",
              roleList: ["432985", "21e4e5e811b857c1a29d2c8499d3ae1f2972a179"],
              isDelete: "1",
              createDate: "2020-12-03 17:46:40",
              updateDate: "2021-02-20 20:34:52",
            },
            {
              id: "DY_USERa4b60de1c0ea0534ecd89b2e3a9932e1c7a04863",
              sort: 1,
              phone: "13800138000",
              avater: "",
              gender: "M",
              username: "mason",
              password: "DY_USERdfb59f0c8ff950313b5e348b016c8434aeb441c7",
              roleList: [
                "432985",
                "21e4e5e811b857c1a29d2c8499d3ae1f2972a179",
                "3f3e3940acedd8c72e8122830b89f20d32ef267a",
              ],
              isDelete: "1",
              createDate: "2020-12-03 17:50:32",
              updateDate: "2021-02-02 11:12:07",
            },
            {
              id: "fe655fa35cf29508aad792575a3d684e667f300e",
              sort: 0,
              phone: "13948934572",
              avater: "",
              gender: "0",
              username: "wuieoghqwrfe",
              password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
              roleList: ["432985"],
              isDelete: "0",
              createDate: "2021-02-18 12:51:05",
              updateDate: "2021-02-18 12:51:05",
            },
          ],
          total: 4,
          pageNum: 1,
          pageSize: 10,
        },
        msg: "获取成功",
      });
    });
  },
  sysmanageUserDelete: () => {
    return new Promise((resolve, reject) => {
      resolve({ code: 0, msg: "删除成功" });
    });
  },
  sysmanageUserEdit: () => {
    return new Promise((resolve, reject) => {
      resolve({ code: 0, msg: "编辑成功" });
    });
  },
  sysmanageUserAdd: () => {
    return new Promise((resolve, reject) => {
      resolve({ code: 0, msg: "新增成功" });
    });
  },

  uploadOnePhotoUrl: () => {
    return "http://locahost:8080/fileManage/uploadImage";
  },
};
// 数据字段 - 性别
const genderOption = [
  {
    label: "男",
    value: "0",
  },
  {
    label: "女",
    value: "1",
  },
  {
    label: "保密",
    value: "2",
  },
];
// 数据字段 - 权限
const getRoleList = [
  {
    value: "432985",
    roleDesc: "这是超级管理员",
    label: "超级管理员",
    code: "superAdmin",
    isDelete: "0",
    createDate: "2020-12-05 00:26:52",
    updateDate: "2020-12-19 19:26:26",
  },
  {
    value: "21e4e5e811b857c1a29d2c8499d3ae1f2972a179",
    roleDesc: "222",
    label: "快速模板使用者",
    code: "file",
    isDelete: "0",
    createDate: "2020-12-05 14:04:40",
    updateDate: "2020-12-05 14:04:40",
  },
  {
    value: "3f3e3940acedd8c72e8122830b89f20d32ef267a",
    roleDesc: "2",
    label: "通用模板使用者",
    code: "2",
    isDelete: "0",
    createDate: "2020-12-05 14:05:00",
    updateDate: "2020-12-05 14:05:00",
  },
];

export default {
  name: "App",
  components: { Integration },
  data() {
    return {
      fieldConfig: [
        { label: "手机", prop: "phone", maxlength: 11 },
        { label: "用户", prop: "username", isSeek: false },
        {
          label: "性别",
          prop: "gender",
          type: "select",
          option: genderOption,
          isTable: false,
        },
        {
          label: "日期",
          prop: "daterange",
          dateType: "daterange",
          type: "date",
          isTable: false,
        },
        {
          label: "权限",
          prop: "roleList",
          type: "select_multiple",
          option: getRoleList,
          isTable: false,
          isSeek: false,
        },
        {
          label: "头像",
          prop: "avater",
          type: "img",
          isTable: false,
          required: false,
        },
      ],
      // 核心模板
      modelConf: {
        mainButton: [
          {
            type: "add",
            label: "新增",
          },
          {
            type: "export",
            label: "导出",
          },
          {
            type: "import",
            label: "导入",
          },
          {
            type: "batch",
            label: "批量删除mason",
            value: "del",
          },
        ],
        // 表格自定义配置
        tabelCustomConf: [
          // 图片
          {
            label: "图片", // 表头名称
            tableType: "image", // 类型
            width: "130", // 宽度
            prop: "avater", // 字段名称
          },
          // Tag
          {
            label: "性别", // 表头名称
            tableType: "tag", // 类型
            width: "68", // 宽度
            prop: "genderLabel", // 字段名称
          },
        ],
        // 处理查询请求参数
        setQueryRequest: (data) => {
          if (Array.isArray(data.daterange)) {
            data.startDate = data.daterange[0];
            data.endDate = data.daterange[1];
          } else {
            data.startDate = "";
            data.endDate = "";
          }
          return data;
        },
        // 处理查询返回数据
        setQueryResponse: (res) => {
          res.data.list.forEach((e, index) => {
            // 设置性别标签
            e.genderLabel = [];
            if (e.gender == "0") {
              e.genderLabel[0] = {
                label: "男",
                type: "success",
              };
            } else if (e.gender == "1") {
              e.genderLabel[0] = {
                label: "女",
                type: "danger",
              };
            } else {
              e.genderLabel[0] = {
                label: "保密",
                type: "",
              };
            }
            e.imgList = e.avater.split(",").filter((s) => {
              return s && s.trim();
            });
          });
          return res;
        },
        setEditRequest: (data) => {
          return data;
        },
        // 设置请求参数 - 删除
        setDeleteReqBody: (data) => {
          return { id: data.id };
        },
        // 接口名称
        requestName: {
          getList: requestModel.sysmanageUserList, // 查询
          deleteOne: requestModel.sysmanageUserDelete, // 删除
          editOne: requestModel.sysmanageUserEdit, // 编辑
          addOne: requestModel.sysmanageUserAdd, // 新增
          upload: requestModel.uploadOnePhotoUrl, // 上传图片
          uploadHeaders: { Authorization: "token-test-001" }, // 上传头部数据
        },
      },
    };
  },
  methods: {
    // 批量处理
    batchFn(data) {
      console.log(data);
    },
    addseekDataFn() {
      console.log("按钮区域");
    },
  },
  created() {},
};
</script>
