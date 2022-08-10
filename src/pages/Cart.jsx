import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getProductToLocalStorage,
  setProductToLocalStorage,
} from '../services/localStorage';
import filterProducts from '../services/services';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
      filteredProducts: [],
    };
  }

  componentDidMount = () => {
    const cartProducts = JSON.parse(getProductToLocalStorage());
    this.setState({
      cartProducts,
      filteredProducts: filterProducts(cartProducts),
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
      const removeAllSimilarProducts = cartProducts
        .filter((product) => product.id !== id);
      this.setState({
        cartProducts: removeAllSimilarProducts,
        filteredProducts: filterProducts(removeAllSimilarProducts) });
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
    const minQuantity = 1;

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
              <div key={ index }>
                <img src={ product.thumbnail } alt={ product.title } />
                <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
                <p>{ product.price }</p>
                <p>{ `Quantidade disponivel: ${product.available_quantity}` }</p>
                <button
                  type="button"
                  name="decrease"
                  id={ index }
                  data-testid="product-decrease-quantity"
                  onClick={ this.handleQuantity }
                  disabled={
                    this.returnQuantEqualCartProducts(product.id)
                    === minQuantity
                  }
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
                  disabled={
                    this.returnQuantEqualCartProducts(product.id)
                    === product.available_quantity
                  }
                >
                  +
                </button>
                <button
                  type="button"
                  name="remove"
                  id={ product.id }
                  data-testid="remove-product"
                  onClick={ this.handleQuantity }
                >
                  Remover
                </button>
              </div>
            ))
          )
        }
        <Link to="/checkout" data-testid="checkout-products">Fechar pedido</Link>
      </div>
    );
  }
}
