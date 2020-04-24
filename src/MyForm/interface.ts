export interface ComponentOption{
  type: string|null, // 单一组件多重展开
  valid: string|RegExp|null,
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
  componentOption: ComponentOption|null
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
    getValue?:() => any
  },
  dispatch:() => void,
  defaultValue?: any,
  type: string,
  label: string,
  componentOption: ComponentOption|null
}

export interface FormItemState{
  value:any
}