import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Comum/home'; 
import HomeP from './Pages/Parceiro/home'; 
import HomeE from './Pages/Estabelecimento/home'; 
import ExtratoE from './Pages/Estabelecimento/extrato'; 
import HistoricoE from './Pages/Estabelecimento/historico'; 
import DadosE from './Pages/Estabelecimento/dadosE'; 
import Transacoes from './Pages/Parceiro/transacoes'; 
import Historico from './Pages/Parceiro/historico'; 
import DadosP from './Pages/Parceiro/dados'; 
import Login from './Pages/Comum/login';
import Produto from './Pages/Estabelecimento/produtos';
import Contato from './Pages/Comum/contato';
import Dados from './Pages/Comum/dados';
import Footer from './Components/footer';
import Logout from './Pages/Parceiro/logout';
import LogoutE from './Pages/Estabelecimento/logout';
import LogoutA from './Pages/Administrador/logout';
import ProdutoC from './Pages/Comum/produtos';
import ProdutoE from './Pages/Parceiro/produtos';
import Gestao from './Pages/Administrador/gestao';
import Creditos from './Pages/Administrador/creditos';
import Painel from './Pages/Administrador/painel';
import Dashboard from './Pages/Administrador/dashboard';
import HomeADM from './Pages/Administrador/home';
import Pedidos from './Pages/Administrador/pedidos'
import ComprarCreditos from './Pages/Parceiro/comprarCreditos';
import Compras from './Pages/Parceiro/compras';
import ConfirmaEmail from './Pages/confirmaEmail'
import ConfirmaParceiro from './Pages/confirmaParceiro'
import HistoricoCredito from './Pages/Parceiro/historicoCredito'
import TransacoesADM from './Pages/Administrador/transacoes'
import Comparador from './Pages/Administrador/comparador'
import ResetarSenha from './Pages/resetarSenha'
import ResetarSenhaParceiro from './Pages/resetarSenhaParceiro'
import Carteira from './Pages/Parceiro/carteira'
import Estoque from './Pages/Estabelecimento/Estoque';
import PainelEstabelecimento from './Pages/Estabelecimento/painelEstabelecimento';
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
        <Route path="/logoutA" element={<LogoutA />} />
        <Route path="/dadosE" element={<DadosE />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/transacoesADM" element={<TransacoesADM />} />
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
        <Route path="/comparador" element={<Comparador />} />
        <Route path="/Compras" element={<Compras />} />
        <Route path="/confirmaEmail" element={ < ConfirmaEmail />} />
        <Route path="/confirmaParceiro" element={ < ConfirmaParceiro />} />
        <Route path="/resetarSenha" element={ < ResetarSenha />} />
        <Route path="/resetarSenhaParceiro" element={ < ResetarSenhaParceiro />} />
        <Route path="/ComprarCredito" element={<ComprarCreditos />} />
        <Route path="/HistoricoCredito" element={<HistoricoCredito />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/carteira" element={<Carteira />} />
        <Route path="/Estoque" element={<Estoque />} />
        <Route path="/painelEstabelecimento" element={<PainelEstabelecimento />} />

        
        <Route path="/alabama" element={<HomeADM />} />
     
      </Routes>
    <Footer />
    </Router>
  </React.StrictMode>,
  rootElement
);