import React from 'react';
import { Input} from 'antd';



interface MyInputProps{
  onChange: Function,
  dispatch: Function,
  value: any,
  componentOption: any
}

export default class MyInput extends React.Component<MyInputProps,{}>{
  state = {

  }

  handleChange = (e:any) => {
    this.props.onChange(e.target.value)
  }

  renderInput = () => {
    const { componentOption } = this.props;
    if(componentOption){
      if(componentOption.type === "textarea"){
        return <Input.TextArea value={this.props.value} onChange={this.handleChange}/>
      }else if(componentOption.type === "password"){
        return <Input.Password value={this.props.value} onChange={this.handleChange}/>
      }else if(componentOption.type === "text"){
        return <Input value={this.props.value} onChange={this.handleChange}/>
      }
    }
    return <Input value={this.props.value} onChange={this.handleChange}/>
  }

  render() {
    return (this.renderInput())
  }
}