import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCategories from '../components/NavCategories';
import { getCategories } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchResult: [],
      categories: [],
    };
  }

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { searchResult, categories } = this.state;

    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <label htmlFor="search">
          <input type="text" id="search" placeholder="Digite um produto" />
        </label>
        {
          !searchResult.length && (
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
          )
        }
        { categories.map(({ name, id }) => (
          <NavCategories
            key={ id }
            name={ name }
          />
        ))}

      </div>
    );
  }
}

// desculpa eu errei.
