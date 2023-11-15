import React from 'react';
import Navbar from '../../Components/navbar/navbarAdministrador';
import Cadastrados from '../../Components/dashboard/cadastrados';
import Grafico from '../../Components/dashboard/parceiroCompras';
import Estabelecimento from '../../Components/dashboard/estabelecimentoCompras';
import OleoColetado from '../../Components/dashboard/oleoColetado';
import ColetaporMes from '../../Components/dashboard/ColetaporMes';

function Dashboard() {

    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };


    return (
        <>
            <Navbar activeLink="/dashboard" />
            <body>
                <div className='containerLogin'>
                    <h1>Dados gerais</h1>
                    <div className='graficos'>
                        <div className='DashboardContainer'>
                            <h3>Quantidade de Parceiros/Estabelecimentos</h3>
                            <Cadastrados options={options} />
                        </div>

                    
                        <div className='DashboardContainer'>
                            <h3>Parceiros que mais fizeram compras</h3>
                            <Grafico options={options} />
                        </div>
                        <div className='DashboardContainer'>
                            <h3>Estabelecimentos que mais fizeram compras</h3>
                            <Estabelecimento options={options} />
                        </div>
                    </div>

                    <div className='graficos'>
                        <div className='DashboardContainer'>
                            <h3>Parceiros que mais coletaram óleo(L)</h3>
                            <OleoColetado options={options} />
                        </div>
                        <div className='DashboardContainer'>
                            <h3>Óleo coletado por mês(L)</h3>
                            <ColetaporMes options={options} />
                        </div>
                    </div>
                    <div className='graficos'>
                    
                    </div>
                </div>
            </body>
        </>
    );
}

export default Dashboard;