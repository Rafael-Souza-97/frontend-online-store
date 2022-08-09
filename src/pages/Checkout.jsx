import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductToLocalStorage } from '../services/localStorage';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
      filteredProducts: [],
      errorMessage: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      cpf: '',
      cep: '',
      adress: '',
      paymentMethod: '',
      isDisabled: true,
    };
  }

  componentDidMount = () => {
    const cartProducts = JSON.parse(getProductToLocalStorage());
    this.setState({ cartProducts }, this.filterProducts);
  }

  filterProducts = () => {
    const { cartProducts } = this.state;
    const reduceCartProducts = cartProducts.reduce((acc, curr) => {
      const hasRepeat = acc.includes(curr.title);
      if (!hasRepeat) {
        const getTitle = curr.title;
        acc.push(getTitle);
        return acc;
      } return acc;
    }, []);
    const filteredProducts = [];
    reduceCartProducts.forEach((title) => {
      filteredProducts.push(cartProducts.find((el) => el.title === title));
    });
    this.setState({ filteredProducts });
  }

  checkMessageAndButtonDisable = () => {
    const { fullName, email, phoneNumber, cpf, cep, adress, paymentMethod } = this.state;
    if (fullName.length && email.length
        && phoneNumber.length && cpf.length
        && cep.length && paymentMethod.length
        && adress.length) {
      this.setState({ errorMessage: '', isDisabled: false });
    } else this.setState({ errorMessage: 'Campos inválidos', isDisabled: true });
  }

  onChange = ({ target }) => {
    const { name } = target;
    const value = name === 'paymentMethod' ? target.id : target.value;
    this.setState({ [name]: value }, this.checkMessageAndButtonDisable);
  }

  onClickSubmitButton = () => {
    const { history } = this.props;
    localStorage.removeItem('products');
    history.push('/');
  }

  render() {
    const { filteredProducts, errorMessage, isDisabled } = this.state;

    return (
      <div>
        <fieldset>
          {filteredProducts.map(({ thumbnail, title, price, id }) => (
            <div key={ id }>
              <img src={ thumbnail } alt="" />
              <p>{title}</p>
              <p>{`R$: ${price}`}</p>
            </div>

          ))}
        </fieldset>
        <fieldset>
          <label htmlFor="fullname">
            <p>Nome Completo:</p>
            <input
              name="fullName"
              required
              type="text"
              data-testid="checkout-fullname"
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="email">
            <p>Email</p>
            <input
              required
              name="email"
              type="email"
              data-testid="checkout-email"
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="cpf">
            <p>CPF:</p>
            <input
              required
              type="text"
              name="cpf"
              id=""
              data-testid="checkout-cpf"
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="phoneNumber">
            <p>Celular:</p>
            <input
              required
              type="text"
              name="phoneNumber"
              id=""
              data-testid="checkout-phone"
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="CEP">
            <p>CEP:</p>
            <input
              required
              type="text"
              name="cep"
              id=""
              data-testid="checkout-cep"
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="adress">
            <p>Endereço:</p>
            <input
              required
              type="text"
              name="adress"
              data-testid="checkout-address"
              onChange={ this.onChange }
            />
          </label>
          <label required htmlFor="paymentMethod">
            <input
              type="radio"
              name="paymentMethod"
              id="boleto"
              data-testid="ticket-payment"
              onChange={ this.onChange }
            />
            Boleto
            <input
              type="radio"
              name="paymentMethod"
              id="visa"
              data-testid="visa-payment"
              onChange={ this.onChange }
            />
            Visa
            <input
              type="radio"
              name="paymentMethod"
              id="masterCard"
              data-testid="master-payment"
              onChange={ this.onChange }
            />
            MasterCard
            <input
              type="radio"
              name="paymentMethod"
              id="elo"
              data-testid="elo-payment"
              onChange={ this.onChange }
            />
            Elo
          </label>
        </fieldset>
        <button
          type="submit"
          data-testid="checkout-btn"
          disabled={ isDisabled }
          onClick={ this.onClickSubmitButton }
        >
          Finalizar compra
        </button>
        { errorMessage && <p data-testid="error-msg">{errorMessage}</p>}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
