import React, { Component } from "react";
import { Table, Button, Input } from "antd";
import MyComponent from "./index";

interface EditableCellProps {
  value: any;
  onChange: Function;
  editor: any;
}

class EditableCell extends Component<EditableCellProps> {
  state = {
    editing: false,
    value: "",
  };

  mapPropsToState() {
    this.setState({value: this.props.value});
  }

  componentDidMount() {
    this.mapPropsToState()
  }

  componentDidUpdate(prevProps: EditableCellProps):void {
    if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){
      this.mapPropsToState()
    }
  }

  handleChange = (val: any) => {
    console.log("change");
    this.setState({ value: val });
  };

  handledbClick = (e: any) => {
    if (this.props.editor) {
      this.setState({ editing: true });
    }
  };
  handleBlur = () => {
    this.setState({ editing: false }, () => {
      this.props.onChange(this.state.value);
    });
  };

  render() {
    const { editing } = this.state;
    const { editor, value } = this.props;
    let RenderComponent = null;

    if (editor) {
      RenderComponent = MyComponent[editor.input_type];
    }

    return (
      <div
        onDoubleClick={this.handledbClick}
        onBlur={this.handleBlur}
        style={{ width: "100%" }}
      >
        {editing ? (
          <RenderComponent
            {...editor}
            onChange={(val: any) => this.handleChange(val)}
            value={this.state.value}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
    );
  }
}

interface MyTableProps {
  onChange: Function;
  dispatch: Function;
  value: any;
  input_props: any;
}

export default class MyTable extends Component<MyTableProps> {
  constructor(props: MyTableProps) {
    super(props);
    this.state = {
      tableColumns: [],
      dataSource: [],
    };
  }

  componentDidUpdate(prevProps: MyTableProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
    }
  }

  handleEdit = (val: any, key: string, index: number) => {
    const { onChange } = this.props;
    let { value } = this.props;
    value[index][key] = val;
    onChange(value);
  };

  // 这里的修改应该需要改变
  render() {
    const { input_props, value } = this.props;
    let { tableColumns } = input_props;
    tableColumns = tableColumns.map((v: any) => ({
      ...v,
      dataIndex: v.key,
      render: (text: string, record: any, index: number) => (
        <EditableCell
          value={text}
          onChange={(val: any) => this.handleEdit(val, v.key, index)}
          editor={v.editor}
        />
      ),
    }));
    return (
      <div>
        <div>
          <Button>新增</Button>
        </div>
        <Table
          columns={tableColumns || []}
          dataSource={value || []}
          rowKey={(record) => record.id}
        />
      </div>
    );
  }
}
