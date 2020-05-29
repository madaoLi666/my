import React, { Component, ReactNode, createRef } from 'react';
// import ReactDOM from 'react-dom';
import styles from './index.less';

interface FloatDragableCardProps {
  children: any,
  title: string | ReactNode,
  defaultLeft?: number,
  defaultTop?: number,
  width?: number,
  height?: number
}

// 与tabPane配合
// const topRange = [52, ];
// const leftRange = [];

export default class FloatDragableCard extends Component<FloatDragableCardProps, any>{

  constructor(props: FloatDragableCardProps) {
    super(props);
    this.floatRef = createRef();
    this.state = {
      left: 0,
      top: 36,
      width: 200,
      height: 350,
      offsetLeft: 0,
      offsetTop: 0,
      mouseDown: false
    }
  }

  componentDidMount() {
    const { defaultLeft = 0, defaultTop = 36, width = 200, height = 350 } = this.props;
    this.setState({
      left: defaultLeft,
      top: defaultTop,
      width,
      height
    })
  }

  handleMouseDown = (event: any) => { 
    this.setState({
      offsetLeft:  event.pageX - this.floatRef.current.offsetLeft,
      offsetTop:  event.pageY - this.floatRef.current.offsetTop,
      mouseDown: true
    })
  }

  handleMouseMove = (event: any) => {
    const { offsetLeft, offsetTop, mouseDown } = this.state;
    if(mouseDown){
        this.setState({
          top: event.pageY - offsetTop,
          left: event.pageX - offsetLeft,
        })
    }
  }

  handleMouseUp = (event: any) => {
    this.setState({mouseDown: false})
  }

  render() {
    const { left, top, width, height } = this.state;
    // 将其挂载至body上，确保parent的position设置不会对齐造成影响
    // 挂载在body无法删除的问题
    // return ReactDOM.createPortal(
      return (
      <div
        id="float-draggable-card"
        ref={this.floatRef}
        className={styles['float-card']}
        style={{ top, left, width, height, position: "absolute" }}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        <div className={styles.title}>
          <span>{this.props.title}</span>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>)
      // , document.querySelector('body'))
  }
}