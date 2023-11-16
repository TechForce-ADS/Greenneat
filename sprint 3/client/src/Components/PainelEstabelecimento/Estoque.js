import React, { useEffect, useState } from "react";
import Garrafa from '../../img/garrafa.png'
import Reciclada from '../../img/Reciclada.png'

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
      <>
      <div className="Oleo">
      <img src={Garrafa} alt='logo' className="OleoImg1"></img>
        <li style={{listStyle:'NONE'}}>
        <p>Óleo novo</p>
          <strong style={{fontSize:'18px'}}>{parceiro.oleoNovo >= 0 ? parceiro.oleoNovo + ' Litros' : '0'}</strong>
        </li>
        </div>
        <div className="Oleo">
        <img src={Reciclada} alt='logo' className="OleoImg2"></img>
        <li style={{listStyle:'NONE'}}>
          <p>Óleo usado</p>
          <strong style={{fontSize:'18px'}}> {parceiro.oleoUsado >= 0 ? parceiro.oleoUsado + ' Litros' : '0'}</strong>
        </li>
        </div>
      </>
    );
  }
  
  export default Saldo;
  