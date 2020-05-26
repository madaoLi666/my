import React,{ Component} from 'react';
import { Select } from 'antd';
// import { isArr } from '../../utils/func';

const { Option } = Select;

interface DefaultSelectProps {
  onChange: Function,
  value: any,
  options: Array<{
    label: string|number,
    value: string|number
  }>,
  multiple: boolean
}

export default class DefaultSelect extends Component<DefaultSelectProps>{
  // multiple 多选 是数组
  //          单选 是基本类型
  handleChange = (val:any) => {
    const {onChange} = this.props;
    // if(isArr(val)){
      onChange(val);
    // }else{
    //   onChange(val);
    // }
  }
  
  renderOptions = (options: Array<{label:string|number,value:string|number}>) => {
    return  options.map((opt: {label: string|number,value: string|number}) => (
      <Option
        key={opt.value}
        value={opt.value}
      >{opt.label}</Option>
    ))
  }
  
  render(){
    const { options = [], multiple } = this.props;
    let { value = (multiple? [] : "") } = this.props;
    if(multiple && value === ""){
      value = [];
    }
    return (
      <Select 
        size="small"
        style={{width: "100%"}}
        value={value}
        allowClear
        showSearch
        mode={multiple ? "multiple" : undefined}
        onChange={this.handleChange}
      >
        {this.renderOptions(options)}
      </Select>
    )
  }
}