import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      requestProduct: {},
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const requestProduct = await getProductFromId(id);
    this.setState({ requestProduct });
  }

  render() {
    const { requestProduct: { price, title, thumbnail } } = this.state;

    return (
      <div>
        <img
          src={ thumbnail }
          alt={ title }
          data-testid="product-detail-image"
        />

        <h3 data-testid="product-detail-name">{ title }</h3>

        <p data-testid="product-detail-price">{`R$: ${price}`}</p>

        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
      </div>
    );
  }
}

Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
