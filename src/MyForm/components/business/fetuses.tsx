import React, { Component } from 'react';
import { Col, Row, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './fetuses.less';

interface BusinessFetusesPorps {
  onChange: Function,
  dispatch: Function,
  value: Array<fetusData>,
  componentOption: any,
  error: any
}

interface fetusData {
  id: number,
  fetalPosition: number | null, // enum
  fetalHeartRate: string | null,
  fetalMovement: string | null,
  presentation: string | null,
  weight: string | number | null,
  avf: string | null,
  umbilicalbloodflow: string | number | null
}

interface BusinessFetusesState {
  value: Array<fetusData>,
  error: any
}

const fetusConfig = [
  { label: "ID", key: "id" },
  { label: "胎儿位置", key: "fetalPosition" },
  { label: "胎心率", key: "fetalHeartRate" },
  { label: "胎动", key: "fetalMovement" },
  { label: "presentation", key: "presentation" },
  { label: "胎儿体重", key: "weight" },
  { label: "avf", key: "avf" },
  { label: "脐带流血", key: "umbilicalbloodflow" },
]

/**
 * 暂时使用antd 新增那个组件
 */

export default class BusinessFetuses extends Component<BusinessFetusesPorps, BusinessFetusesState>{
  constructor(props: BusinessFetusesPorps) {
    super(props);
    this.state = {
      value: [],
      error: []
    }
  }

  mapPropsToState = (): void => {
    const { value, error } = this.props;
    this.setState({ value, error });
  }

  componentDidMount() {
    this.mapPropsToState();
  }
  componentDidUpdate(prevProps: BusinessFetusesPorps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.mapPropsToState();
    }
  }

  handleChange = (id: string | number, key: string, value: any): void => {
    let newValue = this.state.value;
    let i = newValue.findIndex((v: fetusData) => v.id === id);
    if (i !== -1) {
      (newValue[i] as any)[key] = value;
      this.setState({ value: newValue }, () => {
        this.props.onChange(this.state.value);
      })
    }
  }

  renderFetusForm = (v: fetusData, error = "") => {
    return (
      <div key={v.id} className={styles['fetus-form']}>
        {/* <div>胎儿-{v.id}</div> */}
        <Row>
          
          {fetusConfig.map((u: any, index: number) => {
            if(u['key'] === "id"){
              return <Col span={6}  key={index}>
                  <CloseOutlined 
                    onClick={() => this.handleClose(v.id)}
                    style={{paddingLeft: "120px"}}  
                  />
                </Col>
            }

            return <Col span={6} className={styles['fetus-form-item']} key={index}>
              <div>
                <div className={styles['label']}>
                  <label>{u.label}:</label>
                </div>
                <div className={styles['main']}>
                  <div>
                    <Input
                      value={(v as any)[u['key']]}
                      onChange={(e) => this.handleChange(v.id, u['key'], e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {error[u['key']] ? (
                <div className={styles['error']}>
                  {error[u['key']]}
                </div>
              ) : null}
            </Col>
            })}
        </Row>
      </div>
    )
  }

  handleAdd = () => {
    const { value } = this.state;
    let newData = {
      "id": Math.random(),
      "fetalPosition": null,
      "fetalHeartRate": null,
      "fetalMovement": null,
      "presentation": null,
      "weight": null,
      "avf": null,
      "umbilicalbloodflow": null
    };
    value.push(newData);
    this.setState({value},() => {
      this.props.onChange(value);
    })
  }

  handleClose = (id:number|string):void => {
    const { value } = this.state; 
    let i = value.findIndex((v:fetusData) => v.id === id);
    value.splice(i,1);
    this.setState({value},() => {
      this.props.onChange(this.state.value);
    })
  }

  render() {
    const { value, error } = this.state;
    return (
      <div className={styles['fetus']}>
        <div className={styles['title']}>
          <span>胎儿检查</span>
        </div>
        <div className={styles['handle']}>
          <Button type="primary" onClick={this.handleAdd}>添加胎儿</Button>
        </div>
        {value.length !== 0 && value.map((v: fetusData, index: number) => {
          return this.renderFetusForm(v, error[index])
        })}
      </div>
    )
  }
}