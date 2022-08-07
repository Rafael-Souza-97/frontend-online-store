import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import { setProductToLocalStorage } from '../services/localStorage';

export default class Content extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  handleChange = (result) => {
    this.setState((prevState) => ({
      products: [...prevState.products, result],
    }));
  }

  componentDidUpdate = () => {
    const { products } = this.state;
    setProductToLocalStorage(JSON.stringify(products));
  }

  render() {
    const { searchResult: { results } } = this.props;
    return (
      <div>
        { results.length ? (
          results.map((result) => (
            <ItemCard
              key={ result.id }
              thumbnail={ result.thumbnail }
              title={ result.title }
              price={ result.price }
              id={ result.id }
              result={ result }
              change={ this.handleChange }
            />

          ))
        ) : <h3>Nenhum produto foi encontrado</h3>}
      </div>
    );
  }
}

Content.propTypes = {
  searchResult: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired,
};
