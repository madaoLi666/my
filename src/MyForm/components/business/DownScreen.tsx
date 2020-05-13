import React, { Component } from 'react';

interface DownScreenProps {
  onChange: Function,
  dispatch: Function,
  value: any,
  input_props: any,
  error: any,
  path: string
}

// TODO 这个配置有可能时需要抽出的，key暂时不写前方的.
const downscreenConfig = {
  "1": [
    { key: "trisomy21", label: "21三体风险", input_type: "input", span: 7, offset: 1 },
    { key: "trisomy18", label: "18三体风险", input_type: "input", span: 7, offset: 1 },
    { key: "trisomy13", label: "13三体风险", input_type: "input", span: 7, offset: 1 },
    { key: "HCG", label: "HCG", unit: "mom", input_type: "input", span: 7, offset: 1 },
    { key: "PAPPA", label: "PAPPA", unit: "mom", input_type: "input", span: 7, offset: 1 },
    { key: "note", label: "其他异常", input_type: "input", span: 7, offset: 8 }
  ],
  "2": [
    { key: "trisomy21", label: "21三体风险", input_type: "input", span: 7, offset: 1 },
    { key: "trisomy18", label: "18三体风险", input_type: "input", span: 7, offset: 1 },
    { key: "trisomy13", label: "13三体风险", input_type: "input", span: 7, offset: 1 },
    { key: "HCG", label: "HCG", unit: "mom", input_type: "input", span: 7, offset: 1 },
    { key: "PAPPA", label: "PAPPA", unit: "mom", input_type: "input", span: 7, offset: 1 },
    { key: "note", label: "其他异常", input_type: "input", span: 7, offset: 8 }
  ]
}

export default class DownScreen extends Component<DownScreenProps>{

  renderDownScreen = () => {

  }

  render() {
    console.log(this.props);
    return (
      <div>downscreen</div>
    )
  }
}