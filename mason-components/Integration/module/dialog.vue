<template>
  <div class="model-dialog">
    <el-dialog
      width="1000px"
      :title="winText"
      :destroy-on-close="true"
      :visible.sync="showFormBox"
      :close-on-click-modal="false"
      @close="closeFn"
    >
      <div>
        <el-form
          ref="winFormData"
          label-width="100px"
          class="seek-ruleForm"
          :model="winFormData"
          :rules="modelConf.formRules"
        >
          <el-row>
            <el-col
              :span="12"
              v-for="(item, index) in modelConf.formConf"
              :key="index"
            >
              <el-form-item
                :label="item.label"
                :prop="item.prop"
                v-if="item.type === 'text'"
              >
                <el-input
                  v-model="winFormData[item.prop]"
                  :placeholder="'请输入' + item.label"
                  show-word-limit
                  clearable
                  size="mini"
                  :maxlength="item.maxlength"
                  :disabled="
                    winText === '新增'
                      ? item.isAddPermit === false
                      : winText === '编辑'
                      ? item.isEditPermit === true
                      : false
                  "
                />
              </el-form-item>
              <el-form-item
                :label="item.label"
                :prop="item.prop"
                v-if="item.type === 'select' || item.type === 'select_multiple'"
              >
                <el-select
                  v-model="winFormData[item.prop]"
                  :placeholder="'请选择' + item.label"
                  size="mini"
                  filterable
                  :multiple="item.type == 'select_multiple'"
                  :clearable="true"
                  :disabled="
                    winText === '新增'
                      ? item.isAddPermit === false
                      : winText === '编辑'
                      ? item.isEditPermit === false
                      : false
                  "
                >
                  <el-option
                    v-for="item in item.option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="item.label"
                :prop="item.prop"
                v-if="item.type === 'date'"
              >
                <el-date-picker
                  v-model="winFormData[item.prop]"
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
              <el-form-item
                :label="item.label"
                :prop="item.prop"
                v-if="item.type === 'img'"
              >
                <div
                  v-for="(item, index) in winFormData.imgList"
                  :key="index"
                  class="dialog-img"
                >
                  <el-image
                    style="width: 100px; height: 100px"
                    :preview-src-list="winFormData.imgList"
                    :src="item"
                  />
                  <span class="cancel" @click="delImgFn(index)">×</span>
                </div>
                <el-upload
                  class="dialog-img"
                  list-type="picture-card"
                  accept=".jpg, .png"
                  :action="uploadFileUrl"
                  :auto-upload="true"
                  :show-file-list="false"
                  :headers="uploadHeaders"
                  :on-success="handleUploadSuc"
                  :on-error="handleUploadErr"
                  :before-upload="handleBeforeUpload"
                  :limit="item.limit"
                >
                  <el-button
                    size="mini"
                    plain
                    type="primary"
                    :loading="uploadLoadin"
                  >
                    上传图片
                  </el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <slot name="form"></slot>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn" size="mini"> 取消 </el-button>
        <el-button
          plain
          type="primary"
          size="mini"
          :disabled="buttonAct"
          :loading="buttonAct"
          @click="confirmFn('winFormData')"
        >
          确定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["showWindow", "formData", "addOrSet", "modelConf"],
  data() {
    return {
      buttonAct: false, // 激活按钮
      showFormBox: false, // 子组件 - 显示状态
      resumeBeginDate: [], // 时间范围
      winFormData: {}, // 弹窗表单
      formDataName: "", // TS 类型转换
      winText: "-", // 弹窗文字
      uploadLoadin: false, // 上传图片等待
      uploadFileUrl: this.modelConf.requestName.upload(),
      uploadHeaders: this.modelConf.requestName.uploadHeaders,
    };
  },
  watch: {
    showWindow(val, oldVal) {
      this.showFormBox = val;
      // 监听父组件显示状态，关联子组件显示状态。避免修改到父组件的值
      if (val === true) {
        // 重置验证
        this.formDataName = this.$refs["winFormData"];
        if (this.formDataName) {
          this.formDataName.resetFields();
        }
        // 新增 - 编辑
        if (this.addOrSet === 1) {
          this.winText = "新增";
          this.winFormData = { ...this.formData };
        } else if (this.addOrSet === 2) {
          this.winText = "编辑";
          this.winFormData = { ...this.formData };
        }
      } else if (val === false) {
      }
    },
  },
  methods: {
    // 上传图片失败
    handleUploadErr(err, file) {},
    // 上传图片成功
    async handleUploadSuc(res, file) {
      if (res.status === 0) {
        this.winFormData.imgList = [
          ...this.winFormData.imgList,
          ...[res.data.path],
        ];
        this.uploadLoadin = false;
        this.$message({
          showClose: true,
          message: res.msg || "上传成功",
          type: "success",
        });
      } else {
        this.$message({
          showClose: true,
          message: res.msg || "上传失败",
          type: "error",
        });
      }
    },
    // 上传之前
    handleBeforeUpload(res, file) {
      if (this.winFormData["img"]) {
        if (this.winFormData["img"].length > 8) {
          this.$message({
            showClose: true,
            message: "只能上传9张图片",
            type: "error",
          });
          return false;
        } else {
          this.uploadLoadin = true;
          return true;
        }
      } else {
        return true;
      }
    },
    /**
     * 移除图片
     */
    delImgFn(index) {
      this.winFormData.imgList.splice(index, 1);
    },
    // 弹窗组件 - 提交表单
    setDataFn(data) {
      let queryData = this.modelConf.setEditRequest(data);
      if (this.addOrSet === 1) {
        // 新增
        this.buttonAct = true;
        console.log("新增数据", queryData);
        this.modelConf.requestName
          .addOne(queryData)
          .then((res) => {
            this.buttonAct = false;
            if (res.code === 0) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "success",
              });
              this.$emit("setTableList", true);
              this.$emit("winCancelFn", false);
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
      } else if (this.addOrSet === 2) {
        // 编辑
        this.buttonAct = true;
        console.log("编辑数据", queryData);
        this.modelConf.requestName
          .editOne(queryData)
          .then((res) => {
            this.buttonAct = false;
            if (res.code === 0) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "success",
              });
              this.$emit("setTableList", true);
              this.$emit("winCancelFn", false);
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
      }
    },
    // 按钮 - 取消
    cancelFn() {
      this.$emit("winCancelFn", false);
      this.showFormBox = false;
    },
    // 按钮 - 确定
    confirmFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.setDataFn(this.winFormData);
        } else {
          this.$message({
            showClose: true,
            message: "请检查输入内容！",
            type: "error",
          });
          return false;
        }
      });
    },
    // 按钮 - 关闭
    closeFn() {
      this.$emit("winCancelFn", false);
    },
  },
};
</script>
