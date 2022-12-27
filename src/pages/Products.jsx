import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';
import {
  getEvaluationToLocalStorage,
  getProductToLocalStorage, setEvaluationToLocalStorage, setProductToLocalStorage,
} from '../services/localStorage';
// import CartInfo from '../components/CartInfo';
import Header from '../components/Header';
import '../styles/Products.css'

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
      counter: JSON.parse(getProductToLocalStorage()).length,
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

  updateCounter = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
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
      comments: '',
      isDisabled: true });
  }

  render() {
    const { requestProduct: { price, title, thumbnail, shipping },
      isDisabled,
      evaluationArr,
      email,
      comments,
      errorMessage,
      // counter,
    } = this.state;
    const { match: { params: { id } } } = this.props;
    let isShipping = false;
    if (shipping) isShipping = shipping.free_shipping;

    return (
      <div >
        <Header />
        <section className='details'>
          <div className='card-details'>
            { isShipping && <p data-testid="free-shipping">Frete Grátis</p>}
            <h3 data-testid="product-detail-name">{ title }</h3>
            <img
              className='img-details'
              src={ thumbnail }
              alt={ title }
              data-testid="product-detail-image"
            />

            <p data-testid="product-detail-price">{`R$: ${price}`}</p>

            <button
              className='add-to-cart-button'
              type="button"
              onClick={ () => {
              this.handleClick();
              this.updateCounter();
              } }
              data-testid="product-detail-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </section>
      

        {/* <div>
          <CartInfo counter={ counter } />
          <Link to="/cart" data-testid="shopping-cart-button">
            Carrinho
          </Link>
        </div> */}

        <section className='review-form'>
          <div className="form-group">
            <h2 className='avaliations-title'>Avalie o Produto</h2>
            <label required htmlFor="evaluation" className="rating">
              <input
                className="rating"
                type="radio"
                // className="evaluation-input"
                name="evaluation"
                id="1"
                data-testid="1-rating"
                onChange={ this.handleChange }
              />
              1
              <input
                className="rating"
                type="radio"
                // className="evaluation-input"
                name="evaluation"
                id="2"
                data-testid="2-rating"
                onChange={ this.handleChange }
              />
              2
              <input
                className="rating"
                type="radio"
                // className="evaluation-input"
                name="evaluation"
                id="3"
                data-testid="3-rating"
                onChange={ this.handleChange }
              />
              3
              <input
                className="rating"
                type="radio"
                // className="evaluation-input"
                name="evaluation"
                id="4"
                data-testid="4-rating"
                onChange={ this.handleChange }
              />
              4
              <input
                className="rating"
                // className="evaluation-input"
                type="radio"
                name="evaluation"
                id="5"
                data-testid="5-rating"
                onChange={ this.handleChange }
              />
              5
            </label>
          </div>

          <div className="form-email">
            <input
              type="email"
              className="email-avaliation"
              // className="evaluation-input"
              required
              placeholder='Insira seu e-mail'
              data-testid="product-detail-email"
              id={ id }
              value={ email }
              onChange={ this.handleChange }
            />
          </div>

          <div className="form-email">
            <textarea
              name="comments"
              className="textarea"
              // className="evaluation-input"
              placeholder='Insira aqui seu comentário sobre o produto'
              id=""
              cols="30"
              rows="10"
              value={ comments }
              data-testid="product-detail-evaluation"
              onChange={ this.handleChange }
            />
          </div>
    
          <button
            type="button"
            className='avaliation-button'
            disabled={ isDisabled }
            data-testid="submit-review-btn"
            onClick={ this.submitEvaluation }
          >
            Avaliar
          </button>
          {errorMessage && (
          <p data-testid="error-msg">{errorMessage}</p>
        )}
        </section>

        <div className='coments-container'>
          <h2 className='container-title'>O que nossos usuários estão achando do produto</h2>
          {
            evaluationArr.map((el, i) => (
              <div key={ i } className='coment-card'>
                <div className='coment-title'>
                  <p data-testid="review-card-email" className='email-coment'>{el.email}</p>
                  <p data-testid="review-card-rating">{`Nota: ${el.evaluation}`}</p>
                </div>
                <p data-testid="review-card-evaluation">{`Comentário: ${el.comments}`}</p>
              </div>
            ))
          }
        </div>
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
