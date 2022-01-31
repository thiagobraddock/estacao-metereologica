import React, { useState } from 'react';

function Filtro() {
  const prodList = [
    'Iphone 13 Pro',
    'Iphone 11 Pro',
    'Galaxy 18',
    'Xiaomi Mi 240',
    'MotoG 10',
  ];


  //name, price, brand 
// Array de filtros 
const filters = [
  { type: 'brand', value: 'apple' },
  { type: 'price', value: 8000 },
];

// const filteredResults = prodList.filter(el => filters.some(filterEl => el[filterEl.type] === filterEl.brand));


  const [buscar, setBuscar] = useState('');

  // filtro


  const produtosFiltrados = prodList.filter((prod) =>
    prod.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div className="wrapper">
      <h1>Lista de Produtos</h1>
      <input type="text" onChange={(event) => setBuscar(event.target.value)} />

      {produtosFiltrados.map((prod) => (
        <p>{prod}</p>
      ))}
    </div>
  );
}

export default Filtro;
