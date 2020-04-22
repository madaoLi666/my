import * as React from 'react';
import {render} from 'react-dom';
// import Home from './Home';
import CircleProgress from './CircleProgress';
import  './index.less';

const App = () => (
  <div>
    <CircleProgress
      percent={80}
    />
  </div>
)

render(<App/>,document.getElementById('app'));

