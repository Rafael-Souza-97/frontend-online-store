import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
// import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>

    );
  }
}
