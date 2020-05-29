import React, { Component } from "react";
import MyComponent from "../index";
import styles from './index.less';

interface EditableCellProps {
  value: any;
  onChange: Function;
  editor: any;
}

export default class EditableCell extends Component<EditableCellProps> {
  state = {
    editing: false,
    value: "",
  };

  componentDidMount() {
    this.mapPropsToState()
  }

  componentDidUpdate(prevProps: EditableCellProps):void {
    if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){
      this.mapPropsToState();
    }
  }

  handleChange = (val: any) => {
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

  mapPropsToState(): void {
    this.setState({value: this.props.value});
  }

  render() {
    const { editing } = this.state;
    const { editor, value } = this.props;
    let RenderComponent = null;
    if (editor) {
      RenderComponent = MyComponent[editor.input_type];
    }
    const getLabel = () => {
      if (editor.input_type === 'select' && value) {
        const options = editor.input_props.options;
        const opt = options.filter(item => item.value === value).pop();
        return opt.label;
      }
      return value;
    }
    return (
      <div
        onDoubleClick={this.handledbClick}
        onBlur={this.handleBlur}
        className={styles['table-editable-cell']}
      >
        {editing || editor.input_type === 'checkbox' ? (
          <RenderComponent
            {...editor}
            onChange={(val: any) => this.handleChange(val)}
            value={this.state.value}
          />
        ) : (
          // 如value为空，渲染为"-"
          <span>{getLabel()}</span>
        )}
      </div>
    );
  }
}
