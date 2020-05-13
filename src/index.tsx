import React from 'react';
import {render} from 'react-dom';
import 'antd/dist/antd.css';

import Home from './Home';

const App = () => (
  <Home/>
)

render(<App/>,document.getElementById('app'));

