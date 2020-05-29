// Checkbox
interface ExtraEditors {
  key: any,
  editors: Array<FormConfig>,
}

interface RenderData {
  key: string,
  label: string,
  // 暂时仅用于custom
  options?: Array<{
    label:string|number|boolean,
    value:string|number|boolean
  }>,
  extraEditors?: Array<ExtraEditors>
}

// Table
interface TableColumns {
  key?: string,
  title: string,
  children?: Array<TableColumns>,
  width?: number,
  editor?: FormConfig
}

export interface ComponentOption {
  type?: string | null,
  // select
  options?: Array<{
    value: string | number | boolean,
    label: string | number | boolean
  }>,

  // date
  format?: string,
  // checkbox | select 公用
  radio?: boolean,
  extraEditors?: Array<ExtraEditors>,
  renderData?: Array<RenderData>,
  // table
  editable?: boolean,
  tableColumns?: Array<TableColumns>,
  hiddenBtn?: boolean,
  // SimpleObject
  config?: Array<FormConfig>
}

export interface FormConfig {
  name: string,
  key: string,
  label?: string,
  unit?: string,
  input_type: string,

  span?: number,
  offset?: number,
  hidden?: boolean,
  header_label?: boolean,
  is_new_row?: boolean,
  value?: any,
  rules?: string | object | RegExp | null,
  input_props?: ComponentOption,
}

export interface MyFormProp {
  config: Array<FormConfig>,
  value: any,
  getFormHandler?: (func: any) => void,
  submitChange: boolean
}

export interface MyFormState {
  formHandler: any,
  myConfig: Array<FormConfig>
}

export interface FormItemProp {
  actions?: {
    setValue?: (val: any) => void
    getValue?: () => any,
    valid?: () => any,
    reset?: () => void
  },
  getActions: Function,
  dispatch: (fieldName: string, eventName: string, args: any) => void,
  subscribe: (fieldName: string, eventName: string, cb: Function) => void
  value?: any,
  type: string,
  label: string,
  header_label: boolean
  unit: string,
  input_props: ComponentOption | null,
  validate?: string | object | RegExp | null,
  path: string,
  name: string,
  // 置为hidden 不可被修改与重置
  hidden:boolean,
}
export interface FormItemState {
  value: any,
  error: any,
  path: string,
  validate: string | object | RegExp | null
}
