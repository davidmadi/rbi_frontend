import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { configureStore } from './reducers/index.js';
import Home from './routes/home'
import Menu from './routes/menu'
import Section from './routes/section'

//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';//theme burger king
import './index.css';//sizing


ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/menu/section/:id" component={Section}/>
        <Route path="/menu" component={Menu}/>
      </Switch>
    </BrowserRouter>
	</Provider>,
  document.getElementById('root'));
