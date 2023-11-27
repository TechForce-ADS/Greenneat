import React, { useEffect, useState } from "react";

function Saldo() {
    const [parceiro, setParceiro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const email = localStorage.getItem("email");
  
      fetch(`http://localhost:3001/perfil/${email}`)
        .then((response) => response.json())
        .then((data) => {
          setParceiro(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Erro ao obter dados do perfil");
          console.error("Erro ao obter dados do perfil:", error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <p>Carregando...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
  
    return (
      <div>
        <li style={{listStyle:'NONE'}}>
          <strong style={{fontSize:'20px'}}>Crédito: {parceiro.credito} Pontos</strong>
        </li>
      </div>
    );
  }
  
  export default Saldo;
  