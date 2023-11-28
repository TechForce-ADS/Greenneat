import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransacaoNotificacao() {
    const [transacoes, setTransacoes] = useState([]);

    const formatarData = (dataOriginal) => {
        const data = new Date(dataOriginal);
        const ano = data.getFullYear();
        const mes = ('0' + (data.getMonth() + 1)).slice(-2);
        const dia = ('0' + data.getDate()).slice(-2);
        return `${dia}-${mes}-${ano}`;
      };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3001/notificacaoCredito`);
                console.log('Response from backend:', response.data);

                setTransacoes(response.data);
            } catch (error) {
                console.error('Erro ao buscar as transacoes:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {transacoes.map((transacao) => (
                    <p key={transacao.id}>
                        <b>Nome - </b>
                        {transacao.nomeOrganizacao} - <b>Valor - </b> {transacao.valor} Creditos <b>Data - </b> {formatarData(transacao.data)}
                    </p>
                ))}
            </ul>
        </div>
    );
}

export default TransacaoNotificacao;
