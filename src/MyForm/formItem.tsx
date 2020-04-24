import React,{ Component} from 'react';
import { Row, Col ,Input, Button } from 'antd';
// import MyInput from './components/input';
// import MyComponents from './components/index';
import { FormItemProp, FormItemState } from './interface';

export default class FormItem extends Component<FormItemProp,FormItemState>{
  constructor(props:FormItemProp){
    super(props);
    this.state = {
      value: ""
    }
    let self = this;
    if(props.actions){
      props.actions.getValue = function(){
        return self.state.value;
      };
      props.actions.setValue = function(val){
        self.setState({value: val});
      }
    }
  }

  componentDidMount(){
    this.setState({value: this.props.defaultValue});
  }

  handleChange = (e:any) => {
    this.setState({value: e.target.value},() => {
      if(this.props.actions.setValue){
        this.props.actions.setValue(this.state.value)
      }else{
        console.error('缺失setValue Function');
      }
    });
  }

  render(){
    const { dispatch, type, label } = this.props;
    const { value } = this.state;
    // const MyComponent = MyComponents[type];
    return(
      <div>
        <Input
          onChange={this.handleChange}
          value={value}
        />
        {/* {MyComponent ? (
          <div style={{display: 'flex'}}>
            <label>{label}:</label>
            <MyComponent
              onChange={this.handleChange}
              dispatch={dispatch}
              value={value}
            />
          </div>

        ): (
          <div>
            <span>组件<strong>{type}</strong>不存在</span>
          </div>
        )} */}
      </div>
    )
  }
}