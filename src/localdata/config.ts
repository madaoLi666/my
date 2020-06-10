import { FormConfig } from '../MyForm/interface';

const config1: Array<FormConfig> = [
  { name: "id", key: ".g.id", input_type: "input", span: 6, hidden: true },
  { name: "a", key: ".g.a", input_type: "input", label: "测试输入1", span: 6, },
  { name: "aNote", key: ".g.aNote", input_type: "input", label: "测试输入2", span: 6, }
]

// const config: Array<FormConfig> = [
//   {
//     name: "g", key: ".g", input_type: "custom", span: 24,
//     header_label: true,
//     label: "G",
//     input_props: {
//       config: [
//         {name: "id", key: ".id", input_type: "input", span: 6, hidden: true},
//         {name: "a", key: ".a", input_type: "input", label: "测试输入1", span: 6,},
//         {name: "aNote", key: ".aNote", input_type: "input", label: "测试输入2", span: 6,}
//       ]
//     }
//   }
//   // {
//   //   name: "chiefComplaint",
//   //   key: '.a',
//   //   label: "Textarea",
//   //   input_type: "input",
//   //   rules: "required",
//   //   input_props: {
//   //     type: "textarea",
//   //   }
//   // },
//   // { name: "lmp", key: ".b", label: "日期选择器", input_type: "date" }
// ]

const config: Array<FormConfig> = [
  {
    name: "custom",
    key: ".q.(Note)",
    input_type: "checkbox",
    label: "custom",
    input_props: {
      type: "custom",
      renderData: [
        {
          key: "a",
          label: "a",
          options: [
            { label: "有", value: true },
            { label: "无", value: false },
          ],
          extraEditors: [
            {
              key: true,
              editors: [
                {
                  name: "",
                  key: "",
                  input_type: "input"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    name: "multiple",
    key: ".g",
    label: "multiple",
    input_type: "checkbox",
    input_props: {
      type: "multiple",
      renderData: [
        {
          key: "a",
          label: "a",
          extraEditors: [
            {
              key: true,
              editors: [
                { name: "", key: "", input_type: "input" }
              ]
            }
          ]
        },
        {
          key: "b",
          label: "b",
          extraEditors: [
            {
              key: true,
              editors: [
                { name: "", key: "", input_type: "input" }
              ]
            }
          ]
        },
        {
          key: "c",
          label: "c",
          extraEditors: [
            {
              key: true,
              editors: [
                { name: "", key: "", input_type: "input" }
              ]
            }
          ]
        },
      ]
    }
  },
  {
    name: "array-a",
    key: ".fe.0.a",
    input_type: "input",
    label: "数组-A"
  },
  {
    name: "array-c",
    key: ".fe.0.c",
    input_type: "input",
    label: "数组-B"
  },
  // {
  //   name: "diseaseHistory", key: '.g', label: "多选checkbox", input_type: "checkbox",
  //   input_props: {
  //     type: "multiple",
  //     radio: false,
  //     renderData: [
  //       {
  //         key: "a",
  //         label: "a",
  //         extraEditors: [
  //           {
  //             key: "a",
  //             editors: [
  //               { name: "", key: "", label: "输入框", unit: "", input_type: "input", span: 0, offset: 0 }
  //             ]
  //           }
  //         ]
  //       },
  //       { key: "b", label: "b" },
  //       { key: "c", label: "c" },
  //       { key: "d", label: "d" }
  //     ],
  //   }
  // },
  // {
  //   name: "familyHistory-hypertension",
  //   key: '.q',
  //   label: "是否checkbox",
  //   input_type: "checkbox",
  //   input_props: {
  //     type: "custom",
  //     renderData: [
  //       {
  //         key: "a",
  //         label: "高血压",
  //         options: [
  //           { label: "有", value: 1 },
  //           { label: "无", value: 2 },
  //         ],
  //         extraEditors: [
  //           {
  //             // 这个key对应的史当前这个checkboxValue的value
  //             key: 1,
  //             editors: [
  //               { name: "", key: "", label: "输入器", input_type: "input" }
  //             ]
  //           }
  //         ]
  //       },
  //     ],
  //   }
  // },
  // {
  //   name: "p",
  //   key: ".p",
  //   label: "可编辑table",
  //   input_type: "table",
  //   input_props: {
  //     editable: true,
  //     tableColumns: [
  //       {
  //         key: "a",
  //         title: "a",
  //         editor: { name: "", key: "", input_type: "date" }
  //       },
  //       {
  //         key: "b",
  //         title: "b",
  //         editor: { name: "", key: "", input_type: "input" }
  //       },
  //       {
  //         key: "c",
  //         title: "c",
  //         editor: { name: "", key: "", input_type: "select" }
  //       },
  //       {
  //         key: "d",
  //         title: "d",
  //         editor: { name: "", key: "", input_type: "input" }
  //       }
  //     ]
  //   }
  // },
  // {
  //   name: "early-downsscreen",
  //   key: ".do_0",
  //   label: "对象渲染",
  //   header_label: true,
  //   input_type: "custom",
  //   input_props: {
  //     config: [
  //       { name: "a", key: ".a", label: "a", unit: "", input_type: "date", span: 8, offset: 0 },
  //       { name: "b", key: ".b", label: "b", unit: "天", input_type: "input", span: 8, offset: 0 },
  //       { name: "c", key: ".c", label: "c", unit: "天", input_type: "input", span: 8, offset: 0 },
  //       { name: "d", key: ".d", label: "d", unit: "天", input_type: "input", span: 8, offset: 0 },
  //       { name: "e", key: ".e", label: "e", unit: "天", input_type: "date", span: 8, offset: 0 },
  //       { name: "f", key: ".f", label: "f", unit: "天", input_type: "date", span: 8, offset: 0 },
  //     ]
  //   }
  // },
  // {
  //   name: "diseaseHistory-h",
  //   key: ".diseaseHistory",
  //   label: "单选带input",
  //   input_type: "select",
  //   input_props: {
  //     type: "multiple",
  //     options: [
  //       { label: "高血压", value: "hypertension" },
  //       { label: "肾病", value: "nephropathy" },
  //       { label: "呼吸道疾病", value: "respiratoryDisease" },
  //     ],
  //     extraEditors: [
  //       {
  //         key: "hypertension",
  //         editors: [
  //           { name: "", key: "", input_type: "input" }
  //         ]
  //       }
  //     ]
  //   }
  // },
  // {
  //   name: "diseaseHistory-h1",
  //   key: ".diseaseHistory",
  //   label: "多选带input",
  //   input_type: "select",
  //   input_props: {
  //     type: "multiple",
  //     radio: false,
  //     options: [
  //       { label: "高血压", value: "hypertension" },
  //       { label: "肾病", value: "nephropathy" },
  //       { label: "胃病", value: "gastroDisease" },
  //       { label: "呼吸道疾病", value: "respiratoryDisease" },
  //       { label: "癫痫", value: "epilepsy" },
  //       { label: "心脏疾病", value: "cardiacDisease" },
  //       { label: "内分泌疾病", value: "endocrineDisease" },
  //       { label: "甲状腺疾病", value: "thyroidDisease" },
  //       { label: "血液病", value: "hematopathy" },
  //       { label: "精神疾病", value: "mentalDisease" },
  //       { label: "糖尿病", value: "diabetes" },
  //     ],
  //     extraEditors: [
  //       {
  //         key: "hypertension",
  //         editors: [
  //           { name: "", key: "", input_type: "input" }
  //         ]
  //       }
  //     ]
  //   }
  // },
  // {
  //   name: "address-test",
  //   key: ".address-test",
  //   input_type: "address",
  //   label: "地址选择器",
  //   input_props: {

  //   }
  // },
  // {
  //   name: "fe",
  //   key: ".fe",
  //   label: "对象数组",
  //   header_label: true,
  //   input_type: "array-custom",
  //   input_props: {
  //     config: [
  //       { name: "a", key: ".a", label: "a", input_type: "input", span: 8, offset: 0 },
  //       { name: "b", key: ".b", label: "b", input_type: "input", span: 8, offset: 0 },
  //       { name: "c", key: ".c", label: "c", input_type: "input", span: 8, offset: 0 },
  //       { name: "d", key: ".d", label: "d", input_type: "input", span: 8, offset: 0 },
  //       { name: "e", key: ".e", label: "e", input_type: "input", span: 8, offset: 0 },
  //       { name: "f", key: ".f", label: "f", input_type: "input", span: 8, offset: 0 },
  //       { name: "g", key: ".g", label: "g", input_type: "input", span: 8, offset: 0 },
  //     ]
  //   }
  // }
]

export default config;