import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';

export default class Content extends Component {
  render() {
    const { searchResult: { results } } = this.props;
    return (
      <div>
        { results.length ? (
          results.map(({ id, thumbnail, title, price }) => (
            <ItemCard
              key={ id }
              thumbnail={ thumbnail }
              title={ title }
              price={ price }
              id={ id }
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
