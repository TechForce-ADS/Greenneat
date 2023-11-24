import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/navbar/navbarAdministrador';
import FormParceiroEstabelecimento from '../../Components/forms/FormParceiroEstabelecimento';
import ListaParceiros from './parceiros';
import ListaEstabelecimentos from './estabelecimentos';
import Modal from './exibeParceiro';
import FormDefinirPreco from '../../Components/forms/formPrecoOleo';
import OleoContainer from '../../Components/oleoContainer';
import axios from 'axios';


function Gestao() {

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

  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const adm = localStorage.getItem('adm');
    
    if (isLoggedIn || adm) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);
  

  return (
    <>
      <body>
        <Navbar activeLink="/gestao" />
        <div className='containerLogin'>
          <FormParceiroEstabelecimento />
          <ListaParceiros />
          <ListaEstabelecimentos />
          <Modal />
          <FormDefinirPreco />
          <div className="OleosInfo">
          <OleoContainer oleos={oleos} />
          </div>
        </div>
      </body>
    </>

  );
}

export default Gestao;