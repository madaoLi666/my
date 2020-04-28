import React,{ Component, ReactNode} from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface MySelectProps{
  onChange: Function,
  dispatch: Function,
  value: any,
  componentOption: any
}

interface MySelectState{
  options: Array<ReactNode>,
  value: any
}

// TODO 之后再完善这里
const defaultOption = {
  "default":{
    "option":[
      
    ],
  }
}

export default class MySelect extends Component<MySelectProps,MySelectState>{
  constructor(props: MySelectProps){
    super(props);
    this.state = {
      options: [],
      value: ""
    };
  }

  mapPropsToState = () => {
    const { componentOption, value } = this.props;
    const selectOptions = componentOption.selectOptions.map((v:{label:string|number, value: string|number}) => (
      <Option
        value={v.value}
        key={v.value}
      >
        {v.label}
      </Option>
    ));
    this.setState({
      options: selectOptions,
      value: value
    })
  }

  componentDidMount() {
    this.mapPropsToState();
  }

  componentDidUpdate(prevProps:any) {
    if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){
      this.mapPropsToState();
    }
  }

  handleChange = (value: number):void => {
    this.setState({value},() => {
      this.props.onChange(value);
    })
  }

  renderSelect = () => {
    return (
      <Select
        style={{width: '100%'}}
        onChange={this.handleChange}
        value={this.state.value}
      >
        {this.state.options}
      </Select>
    )
  }

  render(){
    return this.renderSelect()
  }
}