import React,{ Component, ReactNode} from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface MySelectProps{
  onChange: Function,
  dispatch: Function,
  value: any,
  input_props: any
}

// TODO 之后再完善这里
const defaultOption = {
  "default":{
    "option":[
      
    ],
  }
}

export default class MySelect extends Component<MySelectProps,{}>{
  constructor(props: MySelectProps){
    super(props);
  
  }

  handleChange = (value: number):void => {
    this.props.onChange(value);
  }

  renderSelect = () => {
    const { input_props, value } = this.props;
    const selectOptions = input_props.selectOptions.map((v:{label:string|number, value: string|number}) => (
      <Option
        value={v.value}
        key={v.value}
      >
        {v.label}
      </Option>
    ));
    return (
      <Select
        style={{width: '100%'}}
        onChange={this.handleChange}
        value={value}
      >
        {selectOptions}
      </Select>
    )
  }

  render(){
    return this.renderSelect()
  }
}