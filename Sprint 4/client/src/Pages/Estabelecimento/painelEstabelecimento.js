import Navbar from '../../Components/navbar/navbarEstabelecimento.js';
import OleoContainer from '../../Components/oleoContainer.js';
import ComparadorP from '../../Components/comparadorP';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {FaMapMarker, FaMoneyBillWave, FaChartLine,  FaUsers, FaHandHoldingWater } from 'react-icons/fa';
import { GiCardboardBoxClosed } from "react-icons/gi";
import { Link } from 'react-router-dom';

import HistoricoE from '../../Components/PainelEstabelecimento/historico.js'
import Saldo from '../../Components/PainelEstabelecimento/saldo.js'
import Estoque from '../../Components/PainelEstabelecimento/Estoque.js'
import Tabela from '../../Components/PainelEstabelecimento/vinculos.js'
import ExtratoE from '../../Components/PainelEstabelecimento/extratoNotificacao.js'



function PainelEstabelecimento() {
  const [oleos, setOleos] = useState([]);


  useEffect(() => {
    const fetchOleos = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/oleos`);
        setOleos(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos óleos:', error);
      }
    };

    fetchOleos();
  }, []);


  return (
    <>
      <Navbar activeLink="/painelEstabelecimento" />
      <body>
      <div className='containerLogin'> {/* PARA CENTRALIZAR TUDO */}
          <div className='containerDashboard'>

            <div className='sectionDashboard1'>
              <div className='ListaContainer'>
                <h2><FaUsers style={{ transform: 'translateY(3px) scale(1.3) ', color: 'green', marginRight: '5px'}} /> Seus parceiros</h2>
                <Tabela />
              </div>


              <div className='ListaContainer' style={{marginTop:'20px'}}>
                <h2><FaHandHoldingWater style={{ transform: 'translateY(3px) scale(1.3) ', color: 'green', marginRight: '5px'}} /> Ultimas coletas</h2>
                <HistoricoE />
                <Link to="/historicoE"> <button style={{marginTop:'20px'}} id="OleoButton" >Ver mais</button> </Link>
              </div>


          

            </div>  
            

            <div className='sectionDashboard2'>


              <div className="EstoqueContainer">
                <h2><GiCardboardBoxClosed  style={{ transform: 'translateY(3px) scale(1.3) ', color: 'green' }} />  Seu estoque</h2>
                <div className='EstoqueOleo'>
                <Estoque />
                </div>
                <Link to="/Estoque"> <button id="OleoButton" >Adicionar mais</button> </Link>
              </div>


              <div className="ComparadorContainer">
                <h2><FaChartLine style={{ transform: 'translateY(3px) ', color: 'green' }} /> Comparador de preços</h2>
                <ComparadorP />
              </div>
            </div>



            <div className='sectionDashboard3'>

              <div className="OleosContainer">
              
                <h2><FaMapMarker style={{ transform: 'rotate(180deg) translateY(-4px)', color: 'green' }} /> Preço atual dos Óleos</h2>
                <OleoContainer oleos={oleos} />
                
                
              </div>

              <div className='ExtratoContainer' style={{marginTop:'20px'}}>
                <h2><FaHandHoldingWater style={{ transform: 'translateY(3px) scale(1.3) ', color: 'green', marginRight: '5px'}} /> Extrato </h2>
                <ExtratoE />
                <Link to="/extratoE"> <button style={{marginTop:'20px'}} id="OleoButton" >Ver mais</button> </Link>
              </div>
                
              <div className="SaldoContainer"  style={{marginTop:'20px'}}>
                 <h2><FaMoneyBillWave style={{ transform: 'translateY(3px) ', color: 'green' }} />  Seus saldo</h2>
                <Saldo />
              </div> 






            </div>

          </div>
        </div>
      </body>
    </>
  );
}

export default PainelEstabelecimento;
