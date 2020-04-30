import React, { Component } from 'react';
import { Table, Button, Input } from 'antd';
import MyComponent from './index';

interface EditableCellProps{
  value: any,
  onChange: Function,
  editor: any
}

class EditableCell extends Component<EditableCellProps>{

  state = {
    editing: false
  }

  handleChange = (val:any) => {
    console.log('change');
    if(!this.state.editing){
      this.props.onChange(val);
    }
  }

  handledbClick = (e:any) => {
    if(this.props.editor){
      this.setState({editing: true});
    }
  }
  handleBlur = () => {
    console.log('111');
    this.setState({editing: false});
  }

  render(){
    const { editing } = this.state;
    const { editor, value } = this.props;
    // console.log(editing);
    // 目前仅做支持一个输入框
    let RenderComponent = null;
    
    if(editor){
      RenderComponent = MyComponent[editor.type];
    }

    return (
      <div
        onDoubleClick={this.handledbClick}
        onBlur={this.handleBlur}
      >
        {editing ? (
          <RenderComponent
             {...editor}
             onChange={this.handleChange}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
    )

  }
}

interface MyTableProps {
  onChange: Function,
  dispatch: Function,
  value: any,
  componentOption: any
}


export default class MyTable extends Component<MyTableProps>{
  constructor(props: MyTableProps){
    super(props);
    this.state = {
      tableColumns: [],
      dataSource: []
    }
  }

  componentDidUpdate(prevProps: MyTableProps) {
    if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){

    }
  }

  handleEdit = (val:any, key: string, index: number) => {
    const { onChange } = this.props;
    let { value } = this.props;
    value[index][key] = val;
    onChange(value);
  }

  // 这里的修改应该需要改变
  render() {
    const { componentOption, value } = this.props;
    let { tableColumns } = componentOption;
    tableColumns = tableColumns.map((v: any) => ({
      ...v,
      dataIndex: v.key,
      render: (text: string, record: any, index: number) => (
        <EditableCell
          value={text}
          onChange={(val: any) => this.handleEdit(val,v.key,index)}
          editor={v.editor}
        />
      )
    }))
    return (
      <div>
        <div>
          <Button>新增</Button>
        </div>
        <Table
          columns={tableColumns || []}
          dataSource={value || []}
          rowKey={record => record.id}
        />
      </div>
    )
  }
}