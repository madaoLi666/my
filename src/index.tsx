import * as React from 'react';
import {render} from 'react-dom';
import Home from './Home';
import CircleProgress from './CircleProgress';
import  './index.less';


const App = () => (
  <div>
    <Home/>
  </div>
)

render(<App/>,document.getElementById('app'));

