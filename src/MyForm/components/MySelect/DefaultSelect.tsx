import React,{ Component} from 'react';
import { Select } from 'antd';

// 普通输入框

const { Option } = Select;

interface DefaultSelectProps {
  onChange: Function,
  value: any,
  options: Array<{
    label: string|number,
    value: string|number
  }>,
  multiple: boolean,
  tags: boolean
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
    const { options = [], multiple, tags = false } = this.props;
    let { value = (multiple? [] : "") } = this.props;
    if(multiple && value === ""){
      value = [];
    }
    let selectMode: string;
    if(multiple){ 
      selectMode = "multiple";
      if(tags){ selectMode = "tags";}
    }
    return (
      <Select
        style={{width: "100%"}}
        value={value}
        allowClear
        showSearch
        mode={selectMode}
        onChange={this.handleChange}
      >
        {this.renderOptions(options)}
      </Select>
    )
  }
}
