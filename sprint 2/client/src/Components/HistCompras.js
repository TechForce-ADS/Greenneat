import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoricoCompras() {
    const [compras, setCompras] = useState([]);
    const [estabelecimento, setEstabelecimento] = useState(null);




    useEffect(() => {
        const email = localStorage.getItem("email");

        fetch(`http://localhost:3001/perfil/${email}`)
            .then(response => response.json())
            .then(data => {

                setEstabelecimento(data);
            })
            .catch(error => console.error("Erro ao obter dados do perfil:", error));
    }, []);

    useEffect(() => {
        if (estabelecimento && estabelecimento.id) {
            const estabelecimentoId = estabelecimento.id;
            async function fetchData() {
                try {
                    const response = await axios.get(`http://localhost:3001/historicoCompras?estabelecimentoId=${estabelecimentoId}`);
                    console.log('Response from backend:', response.data); // Adicionado para debug
                    setCompras(response.data);
                } catch (error) {
                    console.error('Erro ao buscar as compras:', error);
                }
            }
            fetchData();
        }
    }, [estabelecimento]);
    if (compras.length === 0) {
        return <div>Carregando...</div>;
    }



    const formatarData = (dataOriginal) => {
        const data = new Date(dataOriginal);
        const ano = data.getFullYear();
        const mes = ('0' + (data.getMonth() + 1)).slice(-2);
        const dia = ('0' + data.getDate()).slice(-2);
        return `${dia}-${mes}-${ano}`;
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Produtos</th>
                    <th>Data da Transação</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {compras.map((compra) => (
                    <tr key={compra.id}>
                        <td>
                            {compra.produtos.map((produto, index) => (
                                <div key={index}>
                                    <p>Produto: {produto.productName}</p>
                                    {produto.price ? <p>Preço: ${produto.price.toFixed(2)}</p> : null}
                                    <p>Quantidade: {produto.quantity}</p>
                                    <p>_________________</p>

                                </div>
                            ))}
                        </td>
                        <td>{formatarData(compra.createdAt)}</td>
                        <td>
                            {compra.total !== undefined && compra.total !== null
                                ? `$${compra.total.toFixed(2)}`
                                : 'N/A'}
                        </td>
                    </tr>
                ))}
            </tbody>


        </table>
    );
}


export default HistoricoCompras;