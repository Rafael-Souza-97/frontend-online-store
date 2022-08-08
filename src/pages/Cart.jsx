import React, { Component } from 'react';
import { getProductToLocalStorage } from '../services/localStorage';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
    };
  }

  componentDidMount = () => {
    const products = JSON.parse(getProductToLocalStorage());
    this.setState({
      cartProducts: products,
    });
  }

  returnQuantEqualCartProducts = (param) => {
    const { cartProducts } = this.state;
    const quantity = cartProducts.filter((product) => (
      product.title === param
    ));
    return quantity.length;
  }

  render() {
    const { cartProducts } = this.state;

    return (
      <div>
        {
          !cartProducts.length ? (
            <span
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio.
            </span>
          ) : (
            cartProducts.map((product, index) => (
              <div key={ index }>
                <img src={ product.thumbnail } alt={ product.title } />
                <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
                <p>{ product.price }</p>
                <p
                  data-testid="shopping-cart-product-quantity"
                >
                  { this.returnQuantEqualCartProducts(product.title) }
                </p>
              </div>
            ))
          )
        }
      </div>
    );
  }
}
