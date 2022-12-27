import React, { Component } from 'react';
import '../styles/NotFound.css'

export default class NotFound extends Component {
  render() {
    return (
      <div className="error-page">
      <h1>Página não encontrada</h1>
      <img src="https://ouch-cdn2.icons8.com/WRt96udn5a83nQ-5kvXVoari-qsfzDwDvAKQhD-gVB4/rs:fit:512:512/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMjkx/L2YzOWZkNWZjLTNk/ZDUtNGZhYS1hOGZk/LWQwY2NmNmE4OGNj/Mi5zdmc.png" alt="Ícone de página não encontrada" />
      <p>Desculpe, a página que você está tentando acessar não foi encontrada.</p>
      <a href="/">Voltar para a página inicial</a>
    </div>
    );
  }
}
