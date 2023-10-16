import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo.png';
import Icon from '../../img/menu_white_36dp.svg';
import '../style.css';
import menuShow from './script';


function NavbarParceiro({ activeLink }) {


  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Logo} alt="Logo" />
          <div className="navbar-logo-text">GREENNEAT</div>
        </div>

        <div className="navbar-pages">
          <Link to="/homeP" className={activeLink === '/homeP' ? 'active-link' : ''}>
            Inicio
          </Link>
          <Link to="/transacoes" className={activeLink === '/transacoes' ? 'active-link' : ''}>
            Transações
          </Link>
          <Link to="/historico" className={activeLink === '/historico' ? 'active-link' : ''}>
            Histórico
          </Link>
          <Link to="/saldo" className={activeLink === '/saldo' ? 'active-link' : ''}>
            Saldo
          </Link>
          <Link to="/dadosP" className={activeLink === '/dadosP' ? 'active-link' : ''}>
            Perfil
          </Link>
          <Link to="/logout" className={activeLink === '/logout' ? 'active-link' : ''}>
            Logout
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

export default NavbarParceiro;