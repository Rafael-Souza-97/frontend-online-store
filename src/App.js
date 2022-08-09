import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Checkout from './pages/Checkout';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ Cart } />
          <Route exact path="/checkout" component={ Checkout } />

          <Route exact path="/cart/:id" component={ Products } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}
