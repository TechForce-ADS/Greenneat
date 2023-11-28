import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';



function VincularEstabelecimento() {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parceiro, setParceiro] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:3001/perfil/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setParceiro(data);

      })
      .catch((error) => console.error("Erro ao obter dados do perfil:", error));
  }, []);


  useEffect(() => {
    const email = localStorage.getItem('email');

    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/dadosEstabelecimentoParceiro/${email}`);

        if (response.data.estabelecimentos && Array.isArray(response.data.estabelecimentos)) {
          setEstabelecimentos(response.data.estabelecimentos);
        } else {

          setError('Resposta inválida da API');
        }
      } catch (error) {
        console.error('Erro ao buscar estabelecimentos:', error);
        setError('Erro ao buscar estabelecimentos');
      } finally {

        setIsLoading(false);
      }
    }

    fetchData();
  }, []);



  const handleDelete = async (estabelecimentoId) => {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Desvincular',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const parceiroId = parceiro.id;

          await axios.delete(`http://localhost:3001/desvincularEstabelecimento/${parceiroId}/${estabelecimentoId}`);
          setEstabelecimentos((prevEstabelecimentos) =>
            prevEstabelecimentos.filter((estabelecimento) => estabelecimento.id !== estabelecimentoId)
          );
          Swal.fire('Excluído!', 'O estabelecimento foi removido.', 'success');
        } catch (error) {
          console.error('Erro ao desvincular estabelecimento:', error);
          Swal.fire('Erro!', 'Ocorreu um erro ao excluir o estabelecimento.', 'error');
        }
      }
    });
  };
  return (
    <>
    
        <div>
          {estabelecimentos.map((estabelecimento) => (
            <h7 key={estabelecimento.id}>

            <p><b>Nome:</b> {estabelecimento.nomeOrganizacao} <b>- Oléo Novo: </b>{estabelecimento.oleoNovo > 0 ? estabelecimento.oleoNovo : 'Vazio'}  <b> - Oléo Usado: </b> {estabelecimento.oleoUsado > 0 ? estabelecimento.oleoUsado : 'Vazio'}</p>

              
            </h7>
          ))}
        </div>
      

            {estabelecimentos.length === 0 && (
        
          <h5 colSpan="7">Nenhum estabelecimento associado encontrado.</h5>
        
      )}
       
      
    </>
  );
}

export default VincularEstabelecimento;
