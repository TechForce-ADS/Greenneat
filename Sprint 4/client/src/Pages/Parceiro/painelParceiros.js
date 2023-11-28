import Navbar from '../../Components/navbar/navbarParceiro.js';
import OleoContainer from '../../Components/oleoContainer.js';
import ComparadorP from '../../Components/comparadorP';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {FaMapMarker, FaMoneyBillWave, FaChartLine,  FaUsers, FaHandHoldingWater, FaShoppingCart } from 'react-icons/fa';
import { GiCardboardBoxClosed } from "react-icons/gi";
import { Link } from 'react-router-dom';

import HistoricoE from '../../Components/PainelParceiro/historicoColeta.js'
import Saldo from '../../Components/PainelParceiro/saldo.js'
import Estoque from '../../Components/PainelParceiro/Estabelecimentos.js'
import Tabela from '../../Components/PainelParceiro/EstabelecimentosParceiro.js'
import ExtratoE from '../../Components/PainelParceiro/extratoNotificacao.js'



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
      <Navbar activeLink="/painelParceiros" />
      <body>
      <div className='containerLogin'> 
          <div className='containerDashboard'>

            <div className='sectionDashboard1'>
              <div className='ListaContainer'>
                <h2><FaUsers style={{ transform: 'translateY(3px) scale(1.3) ', color: 'green', marginRight: '5px'}} /> Seus estabelecimentos</h2>
                <Tabela />
              </div>


              <div className='ListaContainer' style={{marginTop:'20px'}}>
                <h2><FaHandHoldingWater style={{ transform: 'translateY(3px) scale(1.3) ', color: 'green', marginRight: '5px'}} /> Ultimas coletas</h2>
                <HistoricoE />
                <Link to="/transacoes"> <button style={{marginTop:'20px'}} id="OleoButton" >Ver mais</button> </Link>
              </div>





            </div>  
            

            <div className='sectionDashboard2'>


              <div className="EstoqueContainer">
                <h2><GiCardboardBoxClosed  style={{ transform: 'translateY(3px) scale(1.3) ', color: 'green' }} />  Seus estabelecimentos / Óleo Disponivel</h2>
                
                <Estoque />
                
                <Link to="/carteira"> <button id="OleoButton" >Ver mais</button> </Link>
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
                <h2><FaShoppingCart style={{ transform: 'translateY(3px) scale(1.1) ', color: 'green', marginRight: '5px'}} /> Extrato </h2>
                <ExtratoE />
                <Link to="/Compras"> <button style={{marginTop:'20px'}} id="OleoButton" >Ver mais</button> </Link>
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
