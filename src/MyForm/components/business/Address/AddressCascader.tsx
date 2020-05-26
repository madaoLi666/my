import React, { Component } from 'react';
import { Cascader, Select, Input, Row, Col } from 'antd';
import options, { getStreets } from './cascader-address-options';

interface AddressCascaderProps {
  onChange: Function;
  dispatch?: Function;
  value: any;
  input_props: any;
}

const SPLIT_KEY = ",";

export default class AddressCascader extends Component<AddressCascaderProps> {

  // componentDidUpdate(prevProps: AddressCascaderProps){
  //   if(this.props.value !== prevProps.value){

  //   }
  // }


  handleChange = (val: any, key: number): void => {
    const { value = "" , onChange} = this.props;
    if(key === 0){
      onChange(`${val.join(",")}${SPLIT_KEY}${this.getDataFormProp(value).streetData}${SPLIT_KEY}${this.getDataFormProp(value).inputData}`);
    } else if (key === 1) {
      onChange(`${this.getDataFormProp(value).cascaderData.join(",")}${SPLIT_KEY}${val.value}${SPLIT_KEY}${this.getDataFormProp(value).inputData}`);
    } else if(key === 2){
      onChange(`${this.getDataFormProp(value).cascaderData.join(",")}${SPLIT_KEY}${this.getDataFormProp(value).streetData}${SPLIT_KEY}${val}`);
    }
  }

  getDataFormProp = (value:string = "") => {
    const targetData:any = {
      cascaderData: [],
      streetData: [],
      streetOptions: '',
      inputData: ''
    }
    if (value) {
      const valueArr = value.split(SPLIT_KEY);
      if (valueArr.length > 2) {
        targetData.streetOptions = getStreets(valueArr[0],valueArr[1],valueArr[2]);
      }
      for (let i = 0; i < valueArr.length; i++) {
        if (i <= 2) {
          targetData.cascaderData.push(valueArr[i]);
        }
        if(i === 3){
          targetData.streetData = valueArr[i];
        }
        if(i === 4){
          targetData.inputData = valueArr[i];
          break;
        }
      }
    }
    return targetData;
  }

  render() {
    const {value = ""} = this.props;
    const data = this.getDataFormProp(value);

    return (
      <div>
        <div style={{display: "flex", flexDirection: "row"}}>
        <Row>
          <Col span={6}>
            <Cascader
              options={options}
              onChange={(val: Array<string>) => this.handleChange(val, 0)}
              value={data.cascaderData}
            />
          </Col>
          <Col span={6}>
            <Select
              style={{width: '100%'}}
              size="small"
              options={data.streetOptions}
              onChange={(val: Array<string>, option) => this.handleChange(option, 1)}
              value={data.streetData}
              disabled={!data.cascaderData}
            />
          </Col>
          <Col span={12}>
            <Input
              value={data.inputData}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e.target.value, 2)}
              disabled={!data.streetData}
            />
          </Col>
        </Row>
        </div>
      </div>
    )
  }
}
