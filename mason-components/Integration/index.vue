<template>
  <div class="bsn">
    <!-- 查询条件 -->
    <div class="bsn-seek">
      <div class="seek-buttons">
        <span v-for="(item, index) in modelConf.mainButton" :key="index">
          <el-button
            size="mini"
            type="primary"
            plain
            icon="el-icon-plus"
            @click="addseekDataFn"
            v-show="item.type === 'add'"
          >
            {{ item.label }}
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            icon="el-icon-download"
            @click="addseekDataFn"
            v-show="item.type === 'export'"
          >
            {{ item.label }}
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            icon="el-icon-upload2"
            @click="addseekDataFn"
            v-show="item.type === 'import'"
          >
            {{ item.label }}
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            icon="el-icon-document-copy"
            @click="getSelectTableDataFn"
            v-show="item.type === 'batch'"
          >
            {{ item.label }}
          </el-button>
        </span>
        <slot name="mainbuts"></slot>
      </div>
      <el-form :inline="true" :model="seekData" class="seek-condition">
        <div
          class="seek-form-box"
          v-for="(item, index) in modelConf.seekConf"
          :key="index"
        >
          <el-form-item :label="item.label" v-if="item.type === 'date'">
            <el-date-picker
              v-model="seekData[item.prop]"
              :type="item.dateType"
              :placeholder="'选择' + item.label"
              size="mini"
              range-separator="至"
              :start-placeholder="'开始' + item.label"
              :end-placeholder="'结束' + item.label"
              :picker-options="item.pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="item.label" v-else-if="item.type === 'text'">
            <el-input
              v-model="seekData[item.prop]"
              clearable
              show-word-limit
              size="mini"
              :maxlength="item.maxlength"
              :placeholder="'请输入' + item.label"
            />
          </el-form-item>
          <el-form-item :label="item.label" v-else-if="item.type === 'select'">
            <el-select
              v-model="seekData[item.prop]"
              :placeholder="'请选择' + item.label"
              size="mini"
              filterable
              :clearable="true"
            >
              <el-option
                v-for="item in item.option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item class="seek-form-box">
          <el-button
            size="mini"
            type="primary"
            plain
            icon="el-icon-search"
            :loading="isReqLoading"
            @click="seekDataFn"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表内容 -->
    <div class="bsn-table">
      <div class="table">
        <el-table
          :data="tableData"
          :border="true"
          size="mini"
          style="width: 100%"
          max-height="500"
          @selection-change="selectFn"
        >
          <el-table-column type="selection" width="40" />
          <!-- 常规 -->
          <el-table-column
            v-for="item in modelConf.tabelRoutineConf"
            show-overflow-tooltip
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :sortable="item.isSortable"
            :width="item.width"
          />
          <!-- Tab 标签 -->
          <el-table-column
            v-for="(item, index) in modelConf.tabelCustomConf"
            :key="index"
            :label="item.label"
            :width="item.width"
            :prop="item.prop"
          >
            <template slot-scope="scope">
              <el-tag
                v-show="item.tableType == 'tag'"
                v-for="(tagItem, tagIndex) in scope.row[item.prop]"
                :key="tagIndex"
                :type="tagItem.type"
                class="common-table-tag"
              >
                {{ tagItem.label }}
              </el-tag>
              <el-image
                v-if="item.tableType == 'image'"
                style="width: 60px; height: 60px;"
                :src="scope.row[item.prop]"
                fit="contain"
              >
              </el-image>
            </template>
          </el-table-column>
          <!-- </div> -->
          <el-table-column label="操作" align="center" width="70">
            <div slot-scope="scope">
              <el-tooltip placement="top" effect="light">
                <div slot="content">编辑</div>
                <el-button
                  icon="el-icon-edit"
                  type="text"
                  size="mini"
                  @click="getTableSetFn(scope.row)"
                />
              </el-tooltip>
              <el-tooltip placement="top" effect="light">
                <div slot="content">删除</div>
                <el-button
                  icon="el-icon-delete"
                  type="text"
                  size="mini"
                  @click="remListDataOneFn(scope.row)"
                />
              </el-tooltip>
            </div>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            :current-page="seekData.pageNum"
            :page-sizes="[10, 30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <el-dialog
          title="删除警告"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        >
          <span>您确定要删除这条数据？</span>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelDeleteFn"> 取消 </el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              :disabled="isReqLoading"
              :loading="isReqLoading"
              @click="confirmDeleteFn"
            >
              确定
            </el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 新增编辑 -->
    <div class="bsn-window">
      <WindowModule
        :show-window="isShowWindow"
        :form-data="modelConf.formData"
        :add-or-set="addOrSet"
        :modelConf="modelConf"
        @winCancelFn="getWindowCancelFn"
        @setTableList="setTableList"
      />
    </div>
  </div>
</template>

<script>
import WindowModule from "./module/dialog.vue"; // 新增＆编辑
import { setModelConf } from "./index";

export default {
  name: "testModel",
  props: ["data", "fieldConfig"],
  computed: {},
  components: { WindowModule },
  data() {
    return {
      modelConf: setModelConf(this.fieldConfig, this.data),
      tableData: [], // 列表内容
      isShowWindow: false, // 弹窗状态
      pageTotal: 0, // 数据总数
      addOrSet: 0, // 新增或者编辑 0：默认 - 1：新增 - 2：编辑
      centerDialogVisible: false, // 确定删除
      delData: {}, // 删除数据
      selectTableData: [], // 批量处理索引
      isReqLoading: false, // 查询等待
      tableTextData: "mason",
      roleList: [],
      // 查询 - 条件
      seekData: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    // 新增 - 按钮
    addseekDataFn() {
      this.addOrSet = 1;
      this.isShowWindow = true;
      Object.keys(this.modelConf.formData).forEach((item, index) => {
        this.modelConf.formData[item] = "";
      });
    },
    // 查询 - 按钮
    seekDataFn() {
      this.seekData = { ...this.seekData };
      this.seekData.pageNum = 1;
      this.isReqLoading = true;
      this.getListDataFn(this.seekData);
    },
    // 获取数据
    getListDataFn(seekData) {
      let queryData = this.modelConf.setQueryRequest(seekData);
      this.modelConf.requestName
        .getList(queryData)
        .then(async (Response) => {
          this.isReqLoading = false; // 查询等待
          let res = Response;
          if (res.code === 0) {
            res = await this.modelConf.setQueryResponse(res);
            this.pageTotal = res.data.total;
            this.seekData["pageNum"] = res.data.pageNum;
            this.tableData = [];
            this.tableData = res.data.list;
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 列表组件 - 修改
    getTableSetFn(item) {
      this.addOrSet = 2;
      this.isShowWindow = true;
      console.log(this.modelConf.formData);
      console.log({ ...item });
      this.modelConf.formData = { ...item };
    },
    // 列表组件 - 删除
    getTableDelFn(delData) {
      const delQuery = this.modelConf.setDeleteReqBody(delData);
      this.modelConf.requestName
        .deleteOne(delQuery)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success({
              showClose: true,
              message: res.msg,
              type: "success",
            });
            this.getListDataFn(this.seekData);
            this.centerDialogVisible = false;
          } else {
            this.$message.success({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 表格选择监听
    selectFn(data) {
      this.selectTableData = data;
    },
    // 批量处理
    getSelectTableDataFn() {
      if (this.selectTableData.length === 0) {
        this.$message({
          showClose: true,
          message: "请选择需要批量处理的数据",
          type: "error",
        });
      } else {
        console.log(this.selectTableData, "对这个数据批量处理");
        this.$emit("batchList", this.selectTableData);
      }
    },
    // 按钮 - 删除
    remListDataOneFn(data) {
      this.centerDialogVisible = true;
      this.delData = data;
    },
    // 弹窗 - 确定删除
    confirmDeleteFn() {
      this.getTableDelFn(this.delData);
    },
    // 弹窗 - 取消删除
    cancelDeleteFn() {
      this.centerDialogVisible = false;
      this.$message({
        showClose: true,
        message: "取消删除",
        type: "error",
      });
    },
    // 分页组件 - 每页数量
    handleSizeChange(val) {
      this.seekData["pageSize"] = val;
      this.getListDataFn(this.seekData);
    },
    // 分页组件 - 当前页面
    handleCurrentChange(val) {
      this.seekData["pageNum"] = val;
      this.getListDataFn(this.seekData);
    },
    // 弹窗组件 - 关闭
    getWindowCancelFn(windowChiData) {
      this.isShowWindow = windowChiData;
    },
    // 刷新列表
    setTableList(data) {
      if (data === true) {
        this.getListDataFn(this.seekData);
      }
    },
  },
  created() {
    this.getListDataFn(this.seekData);
  },
};
</script>
