import React, { Component } from 'react';
import { Col, Row, Input, Button } from 'antd';
import styles from './Fetuses.less';

interface BusinessFetusesPorps {
  onChange: Function,
  dispatch: Function,
  value: Array<fetusData>,
  input_props: any,
  error: any,
  path: string
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
  { label: "先露", key: "presentation" },
  { label: "胎儿体重", key: "weight" },
  { label: "avf", key: "avf" },
  { label: "脐带流血", key: "umbilicalbloodflow" },
]


export default class BusinessFetuses extends Component<BusinessFetusesPorps, BusinessFetusesState>{
  constructor(props: BusinessFetusesPorps) {
    super(props);
    this.state = {
      value: [],
      error: []
    }
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
    const newValue = this.state.value;
    const i = newValue.findIndex((fetus: fetusData) => fetus.id === id);
    if (i !== -1) {
      (newValue[i] as any)[key] = value;
      this.setState({ value: newValue }, () => {
        // TODO id为random所得，提交需要删除
        this.props.onChange(this.state.value);
      })
    }
  }

  renderFetusForm = (fetus: fetusData, error = "", i:number):React.ReactNode => {
    return (
      <div key={i} className={styles['fetus-form']}>
        <div className={styles['fetus-title']}>
          <span>胎儿{i+1}</span>
          <Button
            onClick={() => this.handleClose(fetus.id)}  
          >删除
          </Button>
        </div>
        <Row>
          {fetusConfig.map((config: any, index: number) => {
            if(config.key === "id"){return null;}
            return <Col span={6} className={styles['fetus-form-item']} key={index}>
              <div>
                <div className={styles.label}>
                  <span>{config.label}:</span>
                </div>
                <div className={styles.main}>
                  <div>
                    <Input
                      value={(fetus as any)[config.key]}
                      onChange={(e: any) => this.handleChange(fetus.id, config.key, e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {error[config.key] ? (
                <div className={styles.error}>
                  {error[config.key]}
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
    const newData = {
      "id": "",
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
    });
  }

  handleClose = (id:number|string):void => {
    const { value } = this.state; 
    const i = value.findIndex((fetus:fetusData) => fetus.id === id);
    value.splice(i,1);
    this.setState({value},() => {
      this.props.onChange(this.state.value);
    })
  }

  
  mapPropsToState = (): void => {
    const { value, error } = this.props;
    this.setState({ value, error });
  }

  render() {
    const { value, error } = this.state;
    return (
      <div className={styles.fetus}>
        <div className={styles.handle}>
          <Button type="primary" onClick={this.handleAdd}>添加胎儿</Button>
        </div>
        {value.length !== 0 && value.map((v: fetusData, index: number) => {
          return this.renderFetusForm(v, error[index], index)
        })}
      </div>
    )
  }
}