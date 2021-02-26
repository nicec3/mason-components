export const setModelConf = (fieldConfig, modelConf) => {
  modelConf.tabelRoutineConf = []; // 常规列表
  modelConf.seekConf = []; // 查询配置
  modelConf.formConf = []; // 表单配置
  modelConf.formRules = {}; // 表单验证
  modelConf.formData = {}; // 表单数据
  fieldConfig.forEach((item, index) => {
    if (item.isTable !== false) {
      // 设置表格展示数据
      modelConf.tabelRoutineConf.push({
        label: item.label,
        prop: item.prop,
        sortable: item.sortable,
        width: item.width,
      });
    }
    if (item.isSeek !== false) {
      modelConf.seekConf.push({
        label: item.label,
        type: item.type ? item.type : "text",
        prop: item.prop,
        maxlength: item.maxlength ? item.maxlength : 32,
        option: item.option,
        dateType: item.dateType || "",
        pickerOptions: item.pickerOptions,
      });
    }
    // 设置表单
    if (item.isForm !== false) {
      modelConf.formConf.push({
        label: item.label,
        type: item.type ? item.type : "text",
        prop: item.prop,
        maxlength: item.maxlength ? item.maxlength : 32,
        option: item.option,
        isAddPermit: item.isAddPermit,
        isEditPermit: item.isEditPermit,
        required: item.required === false ? false : true,
        limit: item.limit ? item.limit : 1,
        dateType: item.dateType || "",
        pickerOptions: item.pickerOptions,
      });
      modelConf.formRules[item.prop] = [
        {
          required: item.required === false ? false : true,
          message: item.label + "不能为空",
          trigger: item.trigger,
        },
      ];
      modelConf.formData[item.prop] = "";
    }
  });
  return modelConf;
}

