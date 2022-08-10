import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import {
  getProductToLocalStorage,
  setProductToLocalStorage,
} from '../services/localStorage';

export default class Content extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount = () => {
    this.setState({
      products: JSON.parse(getProductToLocalStorage()),
    });
  }

  handleClick = (result) => {
    this.setState((prevState) => ({
      products: [...prevState.products, result],
    }));
  }

  componentDidUpdate = () => {
    const { products } = this.state;
    setProductToLocalStorage(JSON.stringify(products));
  }

  render() {
    const { searchResult: { results }, updateCounter } = this.props;
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
              onClick={ this.handleClick }
              updateCounter={ updateCounter }
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
  updateCounter: PropTypes.func.isRequired,
};
