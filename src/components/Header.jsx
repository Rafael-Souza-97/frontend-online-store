import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // }
  return (
    <header>
      <Link to="/" data-testid="shopping-cart-button">
        <h1 className='logo'>Front-End Online Store</h1>
      </Link>
      {/* <h1 onClick={toggleMenu}>Menu</h1>
      {isMenuOpen && (
        <nav>
          <ul>
            <li><a href="#">Produtos</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </nav>
      )} */}

      <div>
        <Link to="/cart" data-testid="shopping-cart-button" className='cart-icon'>Carrinho</Link>
      </div>
    </header>
  );
}

export default Header;
