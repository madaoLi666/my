import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, } from 'antd';
import styles from './index.less';

interface SiderMenuProps {
  children: any,
  // 是否折起
  collapsed: boolean
}

interface SiderMenuState {

}

/**
 * 256px
 * 80px
 */

const menuWidth = 250;
const menuHeight = 400;

class SiderMenu extends Component<SiderMenuProps, SiderMenuState> {

  state = {
    showMenu: true
  }

  render() {
    const { showMenu } = this.state;
    const { children, collapsed } = this.props;
    const collapsedWidth: number = collapsed ? 80 : 256;
    const left = showMenu ? collapsedWidth : collapsedWidth - menuWidth
    return (
      <div 
        className={styles['menu-block']}
        style={{left}}
      >
        <div 
          className={styles.menu}
          style={{
            width: menuWidth,
            height: menuHeight,
          }}
        >
          {children}
        </div>
        <div className={styles.btn}>
          <Button
            onClick={() => this.setState({ showMenu: !showMenu })}
          >
            {showMenu ? "收起菜单" : "展开菜单"}
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(({global, prenatalDiagnosis}:any) => {
  return {
    collapsed: global.collapsed
  }
})(SiderMenu)