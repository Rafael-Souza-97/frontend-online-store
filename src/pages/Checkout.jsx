import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductToLocalStorage } from '../services/localStorage';
import filterProducts from '../services/services';
import Header from '../components/Header';
import '../styles/Checkout.css';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
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
    this.setState({ filteredProducts: filterProducts(cartProducts) });
  }

  checkMessageAndButtonDisable = () => {
    const { fullName, email, phoneNumber, cpf, cep, adress, paymentMethod } = this.state;
    console.log('name', fullName.length);
    console.log('email', email.length);
    console.log('celular', phoneNumber.length);
    console.log('cpf', cpf.length);
    console.log('cep', cep.length);
    console.log('adress', adress.length);
    console.log('paymentMethod', paymentMethod.length);
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
        <Header />

        <section>
        <div className='checkout-cart-title'>
          <h2 className='container-title'>Carrinho</h2>
        </div>
          {filteredProducts.map(({ thumbnail, title, price, id }) => (
            <div key={ id } className='checkout-card'>
              <img src={ thumbnail } alt="" />
              <p className='checkout-product-title'>{title}</p>
              <p>{`R$: ${price}`}</p>
            </div>

          ))}
        </section>

        <section className='checkout-payment-card'>
          <div className='checkout-cart-title'>
            <h2 className='container-title'>Checkout</h2>
          </div>

          <div className='form-ajust'>
            <div class="label-float">
              <input
                className='input-checkout'
                name="fullName"
                required=" "
                type="text"
                data-testid="checkout-fullname"
                onChange={ this.onChange }
                placeholder=" "
              />
              <label>Nome Completo</label>
            </div>

            <div class="label-float">
              <input
                className='input-checkout'
                required
                name="email"
                type="email"
                data-testid="checkout-email"
                onChange={ this.onChange }
                placeholder=" "
              />
              <label>Email</label>
            </div>
          </div>

          <div className='form-ajust'>
            <div class="label-float">
              <input
                className='input-checkout'
                required
                type="text"
                name="cpf"
                id=""
                data-testid="checkout-cpf"
                onChange={ this.onChange }
                placeholder=" "
              />
              <label>CPF</label>
            </div>

            <div class="label-float">
              <input
                className='input-checkout'
                
                required
                type="text"
                name="phoneNumber"
                id=""
                data-testid="checkout-phone"
                onChange={ this.onChange }
                placeholder=" "
              />
              <label>Celular</label>
            </div>
          </div>

          <div className='form-ajust'>
            <div class="label-float">
              <input
                className='input-checkout'
                required
                type="text"
                name="cep"
                id=""
                data-testid="checkout-cep"
                onChange={ this.onChange }
                placeholder=" "
              />
              <label>CEP</label>
            </div>

            <div class="label-float">
              <input
                className='input-checkout'
                required
                type="text"
                name="adress"
                data-testid="checkout-address"
                onChange={ this.onChange }
                placeholder=" "
              />
              <label>Endereço com número da casa</label>
            </div>
          </div>

          <div className='payment'>
            <label required htmlFor="paymentMethod" className='payment-label'>
              Método de Pagamento:
              <div className='radio'>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="boleto"
                  data-testid="ticket-payment"
                  onChange={ this.onChange }
                />
              Boleto
              </div>

              <div className='radio'>
                <input
                  className='radio'
                  type="radio"
                  name="paymentMethod"
                  id="visa"
                  data-testid="visa-payment"
                  onChange={ this.onChange }
                />
                Visa
              </div>

              <div className='radio'>
                <input
                  className='radio'
                  type="radio"
                  name="paymentMethod"
                  id="masterCard"
                  data-testid="master-payment"
                  onChange={ this.onChange }
                />
                MasterCard
              </div>


              <div className='radio'>
                <input
                  className='radio'
                  type="radio"
                  name="paymentMethod"
                  id="elo"
                  data-testid="elo-payment"
                  onChange={ this.onChange }
                />
                Elo
              </div>
            </label>
          </div>
  

        <button
          className='end-button'
          type="submit"
          data-testid="checkout-btn"
          disabled={ isDisabled }
          onClick={ this.onClickSubmitButton }
        >
          Finalizar compra
        </button>
        { errorMessage && <p data-testid="error-msg">{errorMessage}</p>}
        </section>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
