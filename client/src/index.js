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
import Saldo from './Pages/Parceiro/saldo'; 
import SaldoE from './Pages/Estabelecimento/saldo'; 
import Historico from './Pages/Parceiro/historico'; 
import DadosP from './Pages/Parceiro/dados'; 
import Login from './Pages/Comum/login';
import Produto from './Pages/Comum/produtos';
import Contato from './Pages/Comum/contato';
import Dados from './Pages/Comum/dados';
import Footer from './Components/footer';


const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homeE" element={<HomeE />} />
        <Route path="/comparador" element={<Comparador />} />

        <Route path="/dadosE" element={<DadosE />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/saldo" element={<Saldo />} />
        <Route path="/saldoE" element={<SaldoE />} />
        <Route path="/extratoE" element={<ExtratoE />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/historicoE" element={<HistoricoE />} />
        <Route path="/dadosP" element={<DadosP />} />
        <Route path="/HomeP" element={<HomeP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produto" element={<Produto />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/dados" element={<Dados />} />
      </Routes>
    <Footer />
    </Router>
  </React.StrictMode>,
  rootElement
);