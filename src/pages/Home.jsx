import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Content from '../components/Content';
import NavCategories from '../components/NavCategories';
import {
  getCategories,
  getProductsFromQuery,
  getProductsFromCategory,
} from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchResult: {},
      categories: [],
      inputSearch: '',
      message: 'Digite algum termo de pesquisa ou escolha uma categoria.',
      currentCategory: '',
    };
  }

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { inputSearch } = this.state;
    this.setState({
      searchResult: await getProductsFromQuery(inputSearch),
      message: '',

    });
  }

  saveFilterCategory = ({ target }) => {
    this.setState({ currentCategory: target.id }, async () => {
      const { currentCategory } = this.state;
      this.setState({
        searchResult: await getProductsFromCategory(currentCategory),
        message: '',
      });
    });
  }

  render() {
    const { searchResult, categories, message } = this.state;
    return (
      <div>
        { categories.map(({ name, id }) => (
          <NavCategories
            key={ id }
            name={ name }
            id={ id }
            saveFilterCategory={ this.saveFilterCategory }
          />
        ))}
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <label htmlFor="search">
          <input
            type="text"
            name="inputSearch"
            id="search"
            placeholder="Digite um produto"
            onChange={ this.handleChange }
            data-testid="query-input"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="query-button"
        >
          Pesquisar
        </button>
        { message ? <span data-testid="home-initial-message">{ message }</span> : (
          <Content searchResult={ searchResult } />
        )}
      </div>
    );
  }
}

// desculpa eu errei.
// desculpa eu errei tmbm.
