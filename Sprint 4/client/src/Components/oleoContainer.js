import React from 'react';


const OleoContainer = ({ oleos }) => {
  return (
    <div>
      
      {oleos.map((oleo) => (
        <div key={oleo.id}>
          <span>Valor do óleo {oleo.tipo}:</span>
          <span style={{ marginLeft: '10px' }}><b>{`R$ ${oleo.preco.toFixed(2)}`}</b></span>
        </div>
      ))}
    </div>
  );
};

export default OleoContainer;