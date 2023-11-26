import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/navbar/navbarAdministrador';
import Grafico from '../../Components/dashboard/parceiroCompras';
import OleoContainer from '../../Components/oleoContainer';
import Pedidos from '../../Components/dashboard/pedidoNotificação';
import ComparadorP from '../../Components/comparadorP';
import Transações from '../../Components/dashboard/transacaoNotificacao';
import axios from 'axios';
import {FaMapMarker, FaShoppingCart, FaMoneyBillWave, FaChartLine, FaChartPie} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [oleos, setOleos] = useState([]);
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

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



  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const adm = localStorage.getItem('adm');
    
    if (!isLoggedIn || !adm) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);


  return (
    <>
      <Navbar activeLink="/painel" />
      <body>
        <div className='containerLogin'> {/* PARA CENTRALIZAR TUDO */}
          <div className='containerDashboard'>

            <div className='sectionDashboard1'>
              <div className='GraficoContainer'>
                <h2><FaChartPie style={{ transform: 'translateY(3px) ', color: 'green' }} /> Parceiros que mais compraram</h2>
                <Grafico options={options} />
                <Link to="/dashboard"> <button id="OleoButton" >Ver mais</button> </Link>
              </div>
            </div>  


            <div className='sectionDashboard2'>
              <div className="TransacoesContainer">
                <h2><FaMoneyBillWave style={{ transform: 'translateY(3px) ', color: 'green' }} />  Transações</h2>
                <Transações />
                <Link to="/transacoesADM"> <button id="OleoButton" >Ver mais</button> </Link>
              
              
              </div>
              <div className="ComparadorContainer">
                <h2><FaChartLine style={{ transform: 'translateY(3px) ', color: 'green' }} /> Comparador de preços</h2>
                <ComparadorP />
                <Link to="/comparador"> <button id="OleoButton" >Ver mais</button> </Link>
              </div>
            </div>



            <div className='sectionDashboard3'>

              <div className="OleosContainer">
              
                <h2><FaMapMarker style={{ transform: 'rotate(180deg) translateY(-4px)', color: 'green' }} /> Informações sobre Óleos</h2>
                <OleoContainer oleos={oleos} />
                
                <Link to="/gestao"> <button id="OleoButton" >Mudar valor</button> </Link>
              </div>



              <div className="PedidosContainer">
                <h2><FaShoppingCart style={{ transform: 'translateY(3px) ', color: 'green' }} /> Ultimos Pedidos</h2>
                <Pedidos />
                <Link to="/pedidos"> <button id="OleoButton" >Ver mais</button> </Link>
              </div>


            </div>

          </div>
        </div>
      </body>
    </>
  );
}

export default Dashboard;
