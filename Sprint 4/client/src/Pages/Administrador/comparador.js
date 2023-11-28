import React from 'react';
import Navbar from '../../Components/navbar/navbarAdministrador';
import ComparadorP from '../../Components/comparadorP';


function Comparador() {

  

  return (
    <>
        <Navbar activeLink="/comparador"/>
        <body>
          <div className='containerLogin'>
            <h1>Comparador</h1>
            <div className='graficos'>
              <div className='DashboardContainer1'>
                <ComparadorP />
        </div>
        </div>
        </div>
        </body>
      </>
  );
}

export default Comparador;