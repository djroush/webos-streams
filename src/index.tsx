import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Config from './Config'

Config.setup()
ReactDOM.render(<App />, document.getElementById('root'));
