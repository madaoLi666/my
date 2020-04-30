import { FormConfig } from '../MyForm/interface';

const template = {
  path: '.lmp', label: "lmp", unit: "", type: "", span: 7, offset: 1,
  componentOption: {
    type: "date",
    valid: "required",
    format: "YYYY-MM-DD"
  }
}
// TODO 加入渲染标题

const config: Array<FormConfig> = [
  {
    path: '.chief complaint', label: "主诊", unit: "", type: "input", span: 7, offset: 1, valid: "required",
    componentOption: {
      type: "textarea",
    }
  },
  {
    path: '.lmp', label: "末次月经", unit: "", type: 'date', span: 7, offset: 17, valid: "required",
    componentOption: {
      type: "date",
      format: "YYYY-MM-DD"
    }
  },
  {
    path: '.edd', label: "预产期", unit: "", type: "date", span: 7, offset: 1, valid: "required",
    componentOption: {
      type: "date",
      format: "YYYY-MM-DD"
    }
  },
  {
    path: '.gravidity', label: "G", unit: "", type: "select", span: 7, offset: 1, valid: "required|number",
    componentOption: {
      type: "default",
      selectOptions: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
      ]
    }
  },
  {
    path: '.parity', label: "P", unit: "", type: "select", span: 7, offset: 1, valid: "required|number",
    componentOption: {
      type: "default",
      selectOptions: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
      ]
    }
  },
  {
    path: '.physicalExam.id', label: "体检id", unit: "", type: 'text', span: 7, offset: 1, hidden: true, valid: "required|number",
    componentOption: {
      type: "default",
    }
  },
  {
    path: '.physicalExam.weight', label: "体重", unit: "kg", type: 'input', span: 7, offset: 1, valid: "required|number",
    componentOption: {
      type: "default",
    }
  },
  {
    path: '.physicalExam.height', label: "身高", unit: "cm", type: 'input', span: 7, offset: 1, valid: "required|number",
    componentOption: {
      type: "default",
    }
  },
  {
    path: '.physicalExam.systolic', label: "收缩压", unit: "mmHg", type: 'input', span: 7, offset: 1, valid: "required|number",
    componentOption: {
      type: "default",
    }
  },
  {
    path: '.physicalExam.diastolic', label: "舒张压", unit: "mmHg", type: 'input', span: 7, offset: 1, valid: "required|number",
    componentOption: {
      type: "default",
    }
  },
  {
    path: '.physicalExam.pulse', label: "脉率", unit: "次/min", type: 'input', span: 7, offset: 1, valid: "required|number",
    componentOption: {
      type: "default",
    }
  },
  {
    path: '.physicalExam.temperature', label: "体温", unit: "°C", type: 'input', span: 7, offset: 1, valid: "required|number",
    componentOption: {
      type: "default",
    }
  },
  {
    path: ".fetuses", label: "", unit: "", type: "b-fetuses", span: 24, offset: 16,
    valid: {
      fetalPosition: "required",
      fetalHeartRate: "required",
      fetalMovement: "required",
      presentation: "required",
      weight: "required",
      avf: "required",
      umbilicalbloodflow: "required",
    },
    componentOption: {
      type: null,
    }
  },
  {
    path: '.familyHistory.hypertension', label: "高血压", unit: "", type: "checkbox", span: 24, offset: 0, valid: "",
    componentOption: {
      type: "default",
    }
  },
  // 关于路径相同问题，在config中是不会覆盖的，不用担心
  {
    path: '.familyHistory', label: "肝病", unit: "", type: "checkbox", span: 24, offset: 0, valid: "",
    componentOption: {
      type: "whether",
      // 仅在multiple下有的radio
      radio: true,
      renderData: [{
        key: "hepaticDisease", label: "肝病"
      }],
      extraEditors: [
        {
          key: true,
          editors:[{
            path: "",
            label: "药物名称",
            unit: "",
            type: "input",
            span: 0,
            offset: 0,
            valid: "",
            componentOption: {
              type: "default",
            },
          },{
            path: "",
            label: "用药次数",
            unit: "次",
            type: "select",
            span: 0,
            offset: 0,
            valid: "",
            componentOption: {
              type: "default",
              selectOptions: [
                { value: 1, label: 1 },
                { value: 2, label: 2 },
                { value: 3, label: 3 },
                { value: 4, label: 4 },
                { value: 5, label: 5 },
                { value: 6, label: 6 },
                { value: 7, label: 7 },
                { value: 8, label: 8 },
                { value: 9, label: 9 },
              ]
            },
          }]
        }
      ]
    }
  },
  {
    path: ".familyHistory", label: "家族史", unit: "", type: "checkbox", span: 24, offset: 0, valid: "",
    componentOption: {
      type: "multiple",
      renderData: [
        {
          key: "epilepsy", label:"癫痫"
        },{
          key: "cardiacDisease", label:"心脏病"
        }
      ],
      extraEditors: [
        {
          key: "epilepsy",
          editors: [{
              path: "",
              label: "药物名称",
              unit: "",
              type: "input",
              span: 0,
              offset: 0,
              valid: "",
              componentOption: {
                type: "default",
              },
          }]
        }
      ]
    }
  },
  {
    path: ".fetuses", label: "胎儿检查table", unit: "", type: "table", span: 24, offset: 0, valid: "",
    componentOption: {
      type: "default",
      editable: true,
      tableColumns: [
        {
          key: "id",
          title: "id",
          editor: {
            path: "",
            label: "",
            unit: "",
            type: "input",
            span: 0,
            offset: 0,
            valid: "",
            componentOption: {
              type: "default",
            },
          }
        },
        {key: "fetalPosition", title: "胎儿位置"},
        {key: "fetalHeartRate", title: "胎儿心率"},
        {key: "fetalMovement", title: "胎动"},
        {key: "weight", title: "胎儿重量"},
      ]
    }
  }
]
export default config;