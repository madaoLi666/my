import React,{ Component} from 'react';
import { Row, Col ,Input, Button } from 'antd';
// import MyInput from './components/input';
import MyComponents from './components/index';
import { FormItemProp, FormItemState } from './interface';

import styles from './formItem.less';

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

  handleChange = (val:any) => {
    this.setState({value: val},() => {
      if(this.props.actions.setValue){
        this.props.actions.setValue(this.state.value)
      }else{
        console.error('缺失setValue Function');
      }
    });
  }

  render(){
    const { dispatch, type, label, componentOption } = this.props;
    const { value } = this.state;
    const MyComponent = MyComponents[type];
    return(
      

      <Row className={styles['form-item']}>
          {/* default 8:16 */}
          <Col span={8} className={styles['formItem-label']}>
            <label>{label}:</label>
          </Col>
          <Col span={16}>
            {MyComponent ? (
              <MyComponent
                onChange={this.handleChange}
                dispatch={dispatch}
                value={value}
                componentOption={componentOption}
              />
              ) : (
                <strong>
                  组件{type}不存在
                </strong>
              )}
          </Col>
          
        </Row>
    )
  }
}