import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import dotenv from 'dotenv';

dotenv.config();

ReactDOM.render(<App />, document.getElementById('root'));
