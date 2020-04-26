export interface ComponentOption{
  type: string|null, // 单一组件多重展开
  valid: Array<string|RegExp|object>|string|RegExp|null|undefined,
  // select
  selectOption?: Array<{value:string, label:string}>|null,
  // date
  format?: string
}

export interface FormConfig{
  label:string,
  path:string,
  type:string,
  span:number,
  offset?:number,
  hidden?:boolean,
  value?: any,
  componentOption: ComponentOption,
}

export interface MyFormProp{
  config: Array<FormConfig>,
  // TODO func类型
  getFormHandler?:(func: any) => void
}

export interface MyFormState{
  formHandler:any
}


export interface FormItemProp{
  actions:{
    setValue?:(val:any) => void
    getValue?:() => any,
    valid?:() => any
  },
  dispatch:() => void,
  defaultValue?: any,
  type: string,
  label: string,
  componentOption: ComponentOption|null,
  validate?: Array<string|RegExp|object>|string|RegExp
}

export interface FormItemState{
  value: any,
  error: any,
  validate: Array<string|RegExp|object>|string|RegExp
}