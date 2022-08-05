import React, { Component } from 'react';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
    };
  }

  render() {
    const { cartProducts } = this.state;

    return (
      <div>
        {
          !cartProducts.length && (
            <span
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio.
            </span>
          )
        }
      </div>
    );
  }
}
