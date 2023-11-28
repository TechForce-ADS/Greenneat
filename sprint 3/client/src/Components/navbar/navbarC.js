import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo.png';
import Icon from '../../img/menu_white_36dp.svg';
import '../style.css';
import menuShow from './script';


function NavbarC({ activeLink }) {


  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Logo} alt="Logo" />
          <div className="navbar-logo-text">GREENNEAT</div>
        </div>

        <div className="navbar-pages">
          <Link to="/" className={activeLink === '/' ? 'active-link' : ''}>
            Inicio
          </Link>
          <Link to="/contato" className={activeLink === '/contato' ? 'active-link' : ''}>
            Contato
          </Link>
          <Link to="/login" className={activeLink === '/login' ? 'active-link' : ''}>
            Login
          </Link>
          <Link to="/produtoC" className={activeLink === '/produtoC' ? 'active-link' : ''}>
            Produtos
          </Link>
        </div>
        <div className='mobile-menu-icon'>
          <button onClick={menuShow}>
            <img src={Icon} className="icon" />
          </button>
        </div>
      </nav>
      <div className='mobile-menu'>
        <ul>
          <li mobile-nav-item><Link to="/">
            Inicio
          </Link></li>
          <li mobile-nav-item><Link to="/produto">
            Produtos
          </Link></li>
          <li mobile-nav-item><Link to="/contato">
            Contatos
          </Link></li>
          <li mobile-nav-item><Link to="/login">
            Login
          </Link></li>
          <li mobile-nav-item><Link to="/dados">
            Perfil
          </Link></li>
        </ul>
      </div>

    </header>
  );
}

export default NavbarC;