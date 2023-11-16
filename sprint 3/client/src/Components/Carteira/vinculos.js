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
        // Verifique se a resposta contém a propriedade 'estabelecimentos'
        if (response.data.estabelecimentos && Array.isArray(response.data.estabelecimentos)) {
          setEstabelecimentos(response.data.estabelecimentos);
        } else {
          console.error('A resposta da API não contém a propriedade "estabelecimentos" ou não é um array:', response.data);
          setError('Resposta inválida da API');
        }
      } catch (error) {
        console.error('Erro ao buscar estabelecimentos:', error);
        setError('Erro ao buscar estabelecimentos');
      } finally {
        // Marca que o carregamento foi concluído, independentemente do resultado
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
      <h2 style={{ marginTop: '5%', animation: 'fadeIn 1s' }} id='textoCarteira' className='hide'>
        Seus estabelecimentos
      </h2>

      {isLoading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="estabelecimentos-table hide">
          <thead>
            <tr>
              <th>Nome do Estabelecimento</th>
              <th>E-mail</th>
              <th>CNPJ</th>
              <th>Óleo cedido</th>
              <th>Óleo Virgem</th>
              <th>Óleo Usado</th>
              <th>Endereço</th>
              <th>Créditos</th>

            </tr>
          </thead>
          <tbody>


            {estabelecimentos.map((estabelecimento) => (
              <tr key={estabelecimento.id}>
                <td>{estabelecimento.nomeOrganizacao}</td>
                <td>{estabelecimento.email}</td>
                <td>{estabelecimento.cnpj}</td>
                <td>{estabelecimento.oleoCedido}</td>
                <td>{estabelecimento.oleoNovo > 0 ? estabelecimento.oleoNovo : 'Vazio'}</td>
                <td>{estabelecimento.oleoUsado > 0 ? estabelecimento.oleoUsado : 'Vazio'}</td>
                <td>{estabelecimento.endereco}</td>
                <td>{estabelecimento.credito}</td>
                <td className='td7'>
                  <button id='OleoButton' onClick={() => handleDelete(estabelecimento.id)}>Desvincular</button>

                </td>
              </tr>
            ))}



            {estabelecimentos.length === 0 && (
              <tr>
                <td colSpan="7">Nenhum estabelecimento associado encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default VincularEstabelecimento;
