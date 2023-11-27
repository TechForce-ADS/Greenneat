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
         
          <Link to="/painel" className={activeLink === '/painel' ? 'active-link' : ''}>
            Painel
          </Link>
          <Link to="/dashboard" className={activeLink === '/dashboard' ? 'active-link' : ''}>
            Dashboard
          </Link>
          <Link to="/transacoesADM" className={activeLink === '/transacoesADM' ? 'active-link' : ''}>
            Transações
          </Link>
          <Link to="/comparador" className={activeLink === '/comparador' ? 'active-link' : ''}>
           Comparador
          </Link>
          <Link to="/gestao" className={activeLink === '/gestao' ? 'active-link' : ''}>
            Gestão
          </Link>
          <Link to="/pedidos" className={activeLink === '/pedidos' ? 'active-link' : ''}>
           Pedidos
          </Link>
          <Link to="/creditos" className={activeLink === '/creditos' ? 'active-link' : ''}>
            Créditos
          </Link>
          <Link to="/logoutA" className={activeLink === '/logout' ? 'active-link' : ''}>
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
            Início
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