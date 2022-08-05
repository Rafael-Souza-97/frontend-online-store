import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
    };
  }

  render() {
    const { result } = this.state;

    return (
      <div>
        <label htmlFor="search">
          <input type="text" id="search" placeholder="Digite um produto" />
        </label>
        {
          !result.length && (
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
          )
        }

      </div>
    );
  }
}

// desculpa eu errei.
