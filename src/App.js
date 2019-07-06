import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Providers from './Providers';
import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={Providers} />
  </Switch>
);

export default App;
