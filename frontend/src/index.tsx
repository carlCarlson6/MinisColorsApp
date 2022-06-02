import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.css';
import dotenv from 'dotenv';

dotenv.config();

ReactDOM.render(<App />, document.getElementById('root'));
