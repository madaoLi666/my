interface ExtraEditors {
  key: any, // 此处key对应的是checkbox的value值
  editors: Array<FormConfig>
}

export interface ComponentOption {
  type: string | null, // 单一组件多重展开
  // valid: string|object|RegExp|null,
  // select
  selectOptions?: Array<{ value: string | number, label: string | number }> | null,
  // date
  format?: string,
  // checkbox
  radio?: boolean,
  extraEditors?: Array<ExtraEditors>,
  renderData?: Array<string>|Array<{key:string,label: string}>
}

export interface FormConfig {
  path: string,
  label: string,
  unit: string,
  type: string,
  span: number,
  offset: number,
  hidden?: boolean,
  value?: any,
  valid: string | object | RegExp | null,
  componentOption: ComponentOption,
}

export interface MyFormProp {
  config: Array<FormConfig>,
  // TODO func类型
  getFormHandler?: (func: any) => void
}

export interface MyFormState {
  formHandler: any
}


export interface FormItemProp {
  actions?: {
    setValue?: (val: any) => void
    getValue?: () => any,
    valid?: () => any
  },
  dispatch?: () => void,
  defaultValue?: any,
  type: string,
  label: string,
  unit: string,
  componentOption: ComponentOption | null,
  validate?: string | object | RegExp | null
}

export interface FormItemState {
  value: any,
  error: any,
  validate: string | object | RegExp | null
}