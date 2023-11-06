import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Comum/home'; 
import HomeP from './Pages/Parceiro/home'; 
import HomeE from './Pages/Estabelecimento/home'; 
import ExtratoE from './Pages/Estabelecimento/extrato'; 
import HistoricoE from './Pages/Estabelecimento/historico'; 
import DadosE from './Pages/Estabelecimento/dadosE'; 
import Comparador from './Pages/Parceiro/comparador'; 
import Transacoes from './Pages/Parceiro/transacoes'; 
import SaldoE from './Pages/Estabelecimento/saldo'; 
import Historico from './Pages/Parceiro/historico'; 
import DadosP from './Pages/Parceiro/dados'; 
import Login from './Pages/Comum/login';
import Produto from './Pages/Estabelecimento/produtos';
import Contato from './Pages/Comum/contato';
import Dados from './Pages/Comum/dados';
import Footer from './Components/footer';
import Logout from './Pages/Parceiro/logout';
import LogoutE from './Pages/Estabelecimento/logout';
import ProdutoC from './Pages/Comum/produtos';
import ProdutoE from './Pages/Parceiro/produtos';
import Gestao from './Pages/Administrador/gestao';
import Creditos from './Pages/Administrador/creditos';
import Pedidos from './Pages/Administrador/pedidos'
import ComprarCreditos from './Pages/Parceiro/comprarCreditos';
import Compras from './Pages/Parceiro/compras';
import ConfirmaEmail from './Pages/confirmaEmail'
import ConfirmaParceiro from './Pages/confirmaParceiro'
import HistoricoCredito from './Pages/Parceiro/historicoCredito'
const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homeE" element={<HomeE />} />
        <Route path="/comparador" element={<Comparador />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/logoutE" element={<LogoutE />} />
        <Route path="/dadosE" element={<DadosE />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/saldoE" element={<SaldoE />} />
        <Route path="/creditos" element={<Creditos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/extratoE" element={<ExtratoE />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/historicoE" element={<HistoricoE />} />
        <Route path="/dadosP" element={<DadosP />} />
        <Route path="/HomeP" element={<HomeP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produto" element={<Produto />} />
        <Route path="/produtoE" element={<ProdutoE />} />
        <Route path="/produtoC" element={<ProdutoC />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/dados" element={<Dados />} />
        <Route path="/gestao" element={<Gestao />} />
        <Route path="/Compras" element={<Compras />} />
        <Route path="/confirmaEmail" element={ < ConfirmaEmail />} />
        <Route path="/confirmaParceiro" element={ < ConfirmaParceiro />} />
        <Route path="/ComprarCredito" element={<ComprarCreditos />} />
        <Route path="/HistoricoCredito" element={<HistoricoCredito />} />
      </Routes>
    <Footer />
    </Router>
  </React.StrictMode>,
  rootElement
);