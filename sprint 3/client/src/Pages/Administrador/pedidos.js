import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarP from '../../Components/navbar/navbarAdministrador';

function HistoricoComprasADM() {
    const [compras, setCompras] = useState([]);
    const [totalGanho, setTotalGanho] = useState(0); // Variável para acompanhar o total ganho

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3001/historicoComprasADM`);
                console.log('Response from backend:', response.data);
                setCompras(response.data);

                // Calcula o total ganho somando todas as compras
                const total = response.data.reduce((total, compra) => total + compra.total, 0);
                setTotalGanho(total);
            } catch (error) {
                console.error('Erro ao buscar as compras:', error);
            }
        }
        fetchData();
    }, []);

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
        <>
            <NavbarP activeLink="/" />
    
            <table>
                <thead>
                    <tr>
                        
                        <th>Produtos</th>
                        <th>Nome da Organização</th> 
                        <th>Data da Transação</th>
                        <th>Tipo</th>       
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
                            <td>{compra.nomeOrganizacao}</td> 
                            <td>{formatarData(compra.createdAt)}</td>
                            <td> <p>Tipo: {compra.tipo}</p></td>                   
                            <td>
                                {compra.total !== undefined && compra.total !== null
                                    ? `$${compra.total.toFixed(2)}`
                                    : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='container'>
                <h3>Total ganho: ${totalGanho.toFixed(2)}</h3> 
            </div>
        </>
    );
}

export default HistoricoComprasADM;
