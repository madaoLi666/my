export interface FormConfig{
  label:string,
  path:string,
  type:string,
  span:number,
  offset?:number,
  hidden?:boolean,
  value?: any
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
  label: string
}

export interface FormItemState{
  value:any
}