import './css/App.css'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//import { ThemeProvider } from '@material-ui/styles';
import MainRouter from './mainRouter';
//import Contact from './contact'
//import theme from '../theme';
//import { hot } from 'react-hot-loader'

const App = () => {
  return (
  <Router>

  <MainRouter />

  </Router>
  );
};
export default App;