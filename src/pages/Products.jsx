import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';
import {
  getEvaluationToLocalStorage,
  getProductToLocalStorage, setEvaluationToLocalStorage, setProductToLocalStorage,
} from '../services/localStorage';

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      requestProduct: {},
      productsInCart: [],
      isDisabled: true,
      evaluationArr: [],
      email: '',
      evaluation: '',
      comments: '',
      errorMessage: '',
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const requestProduct = await getProductFromId(id);
    const productsInCart = JSON.parse(getProductToLocalStorage());
    const evaluationArr = await JSON.parse(getEvaluationToLocalStorage(id));
    this.setState({
      requestProduct,
      productsInCart,
      evaluationArr,
    });
  }

  handleClick = () => {
    const { requestProduct, productsInCart } = this.state;
    if (productsInCart) {
      productsInCart.push(requestProduct);
      this.setState({ productsInCart }, setProductToLocalStorage(JSON
        .stringify(productsInCart)));
    }
  }

  checkButton = () => {
    const { hasValidEmail, evaluation } = this.state;
    if (hasValidEmail && evaluation) {
      this.setState({ isDisabled: false, errorMessage: '' });
    } if (!hasValidEmail || !evaluation) {
      this.setState({ isDisabled: true, errorMessage: 'Campos inválidos' });
    }
  }

  handleChange = ({ target }) => {
    const { type, name, value, id } = target;
    if (type === 'email') {
      const emailRegex = /\S+@\S+\.\S+/;
      this.setState({
        hasValidEmail: emailRegex.test(value),
        email: value,
        productId: id }, this.checkButton);
    }
    if (type === 'radio') {
      this.setState({ evaluation: id }, this.checkButton);
    }
    if (name === 'comments') {
      this.setState({ comments: value });
    }
  }

  submitEvaluation = () => {
    const {
      email,
      evaluation,
      comments, evaluationArr, productId } = this.state;
    const { match: { params: { id } } } = this.props;
    const evaluationObj = { email, evaluation, comments, productId };
    evaluationArr.push(evaluationObj);
    setEvaluationToLocalStorage(id, JSON.stringify(evaluationArr));
    this.setState({
      email: '',
      evaluation: '',
      comments: '' });
  }

  render() {
    const { requestProduct: { price, title, thumbnail },
      isDisabled,
      evaluationArr,
      email,
      comments,
      errorMessage,
    } = this.state;
    const { match: { params: { id } } } = this.props;

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

        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
        <input
          type="email"
          className="evaluation-input"
          required
          data-testid="product-detail-email"
          id={ id }
          value={ email }
          onChange={ this.handleChange }
        />
        <label required htmlFor="evaluation">
          <input
            type="radio"
            className="evaluation-input"
            name="evaluation"
            id="1"
            data-testid="1-rating"
            onChange={ this.handleChange }
          />
          1
          <input
            type="radio"
            className="evaluation-input"
            name="evaluation"
            id="2"
            data-testid="2-rating"
            onChange={ this.handleChange }
          />
          2
          <input
            type="radio"
            className="evaluation-input"
            name="evaluation"
            id="3"
            data-testid="3-rating"
            onChange={ this.handleChange }
          />
          3
          <input
            type="radio"
            className="evaluation-input"
            name="evaluation"
            id="4"
            data-testid="4-rating"
            onChange={ this.handleChange }
          />
          4
          <input
            className="evaluation-input"
            type="radio"
            name="evaluation"
            id="5"
            data-testid="5-rating"
            onChange={ this.handleChange }
          />
          5
        </label>
        <textarea
          name="comments"
          className="evaluation-input"
          id=""
          cols="30"
          rows="10"
          value={ comments }
          data-testid="product-detail-evaluation"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="submit-review-btn"
          onClick={ this.submitEvaluation }
        >
          Avaliar
        </button>
        {errorMessage && (
          <p data-testid="error-msg">{errorMessage}</p>
        )}

        {
          evaluationArr.map((el, i) => (
            <div key={ i }>
              <p data-testid="review-card-email">{el.email}</p>
              <p data-testid="review-card-rating">{`Nota: ${el.evaluation}`}</p>
              <p data-testid="review-card-evaluation">{el.comments}</p>
            </div>
          ))
        }
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
