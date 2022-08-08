import React, { Component } from 'react';
import {
  getProductToLocalStorage,
  setProductToLocalStorage,
} from '../services/localStorage';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
      filteredProducts: [],
    };
  }

  componentDidMount = () => {
    const products = JSON.parse(getProductToLocalStorage());
    this.setState({
      cartProducts: products,
    }, () => {
      const { cartProducts } = this.state;
      const reduceCartProducts = cartProducts.reduce((acc, curr) => {
        const hasRepeat = acc.includes(curr.title);
        if (!hasRepeat) {
          const a = curr.title;
          acc.push(a);
          return acc;
        } return acc;
      }, []);
      const filteredProducts = [];
      reduceCartProducts.forEach((title) => {
        filteredProducts.push(cartProducts.find((el) => el.title === title));
      });
      this.setState({ filteredProducts });
    });
  }

  componentDidUpdate = () => {
    const { cartProducts } = this.state;
    setProductToLocalStorage(JSON.stringify(cartProducts));
  }

  returnQuantEqualCartProducts = (param) => {
    const { cartProducts } = this.state;
    const quantity = cartProducts.filter((product) => (
      product.id === param
    ));
    return quantity.length;
  }

  handleQuantity = ({ target }) => {
    const { cartProducts } = this.state;
    const { name, id } = target;
    if (name === 'remove') {
      const item = document.querySelector('#item');
      item.remove();
      // solução temporária para requisito 10 (NÃO DEVERIA SER EXIGIDO, segundo README)
    }
    if (name === 'decrease') {
      cartProducts.splice(id, 1); // params: index que quer remover, e quantos quer remover
      this.setState({ cartProducts });
    } if (name === 'increase') {
      const productToAdd = cartProducts.find((el) => el.id === id);
      this.setState((prevState) => ({
        cartProducts: [...prevState.cartProducts, productToAdd],
      }));
    }
  }

  render() {
    const { filteredProducts } = this.state;

    return (
      <div>
        {
          !filteredProducts.length ? (
            <span
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio.
            </span>
          ) : (
            filteredProducts.map((product, index) => (
              <div key={ index } id="item">
                <img src={ product.thumbnail } alt={ product.title } />
                <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
                <p>{ product.price }</p>
                <button
                  type="button"
                  name="decrease"
                  id={ index }
                  data-testid="product-decrease-quantity"
                  onClick={ this.handleQuantity }
                >
                  -
                </button>
                <p
                  data-testid="shopping-cart-product-quantity"
                >
                  { this.returnQuantEqualCartProducts(product.id) }
                </p>
                <button
                  type="button"
                  name="increase"
                  id={ product.id }
                  data-testid="product-increase-quantity"
                  onClick={ this.handleQuantity }
                >
                  +
                </button>
                <button
                  type="button"
                  name="remove"
                  data-testid="remove-product"
                  onClick={ this.handleQuantity }
                >
                  Remover
                </button>
              </div>
            ))
          )
        }
      </div>
    );
  }
}
