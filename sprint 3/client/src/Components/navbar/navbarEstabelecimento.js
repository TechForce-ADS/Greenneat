import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo.png';
import Icon from '../../img/menu_white_36dp.svg';
import '../style.css';
import menuShow from './script';


function Navbar({ activeLink }) {


  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Logo} alt="Logo" />
          <div className="navbar-logo-text">GREENNEAT</div>
        </div>

        <div className="navbar-pages">
          <Link to="/homeE" className={activeLink === '/homeE' ? 'active-link' : ''}>
            Inicio
          </Link>
          <Link to="/Estoque" className={activeLink === '/Estoque' ? 'active-link' : ''}>
          Estoque
          </Link>
          <Link to="/produto" className={activeLink === '/produto' ? 'active-link' : ''}>
            Produtos
          </Link>
          <Link to="/extratoE" className={activeLink === '/extratoE' ? 'active-link' : ''}>
            Extrato
          </Link>
          <Link to="/historicoE" className={activeLink === '/historicoE' ? 'active-link' : ''}>
            Histórico
          </Link>
         
          <Link to="/dadosE" className={activeLink === '/dadosE' ? 'active-link' : ''}>
            Perfil
          </Link>
          <Link to="/logoutE" className={activeLink === '/logoutE' ? 'active-link' : ''}>
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

export default Navbar;