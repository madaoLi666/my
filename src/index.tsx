import * as React from 'react';
import * as ReactDOM from 'react-dom';

import styles from  './index.less';
const render = () => {
  ReactDOM.render(
    <div className={styles.app}>123</div>,
    document.getElementById('app')
  )
}
render()