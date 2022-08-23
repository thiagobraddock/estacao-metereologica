import React, { useEffect, useState } from 'react';
import './style.css';
// api usada https://apitempo.inmet.gov.br/condicao/capitais/2022-04-22
// const today = new Date().toLocaleDateString('sv-SE');

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const endpoint = 'https://apitempo.inmet.gov.br/condicao/capitais/';
const API = endpoint + yesterday.toLocaleDateString('sv-SE');

function FiltroChuvaNested() {
  // estado generico para os inputs
  const [selected, setSelected] = useState({
    column: '',
    condition: '',
    value: '',
  });

  const [DATA, setData] = useState([]);

  // estado para nome das capitais
  const [cityInput, setNameInput] = useState('');

  // estado para o array de filtros
  const [selectedFilters, setSelectedFilters] = useState([]);

  // vc quer saber mais sobre isso? Link legal aqui
  // https://devtrium.com/posts/async-functions-useeffect

  useEffect(() => {
    const fetchData = async () => {
      const dados = await fetch(API);
      const response = await dados.json();
      setData(response);
    };

    fetchData().catch(console.warn);
  }, []);

  const tratarDados = (linha) => {
    // console.info('Linha: ', linha);
    const bools = [];
    selectedFilters.forEach((filter) => {
      switch (filter.condition) {
        case '>':
          bools.push(Number(linha[filter.column]) >= Number(filter.value));
          break;
        case '<':
          bools.push(Number(linha[filter.column]) <= Number(filter.value));
          break;
        case '=':
          bools.push(linha[filter.column] === filter.value.toUpperCase());
          break;
        default:
          return true;
      }
    });

    return bools.every((el) => el);
  };

  const tratarOpcoes = (opcao) =>
    !selectedFilters.find((filtro) => opcao === filtro.column);

  return (
    <div>
      <header>
        <div className="filter-city">
          <input
            placeholder="Filtro por cidade"
            type="text"
            id=""
            name="cityName"
            value={cityInput}
            onChange={(e) => {
              setNameInput(e.currentTarget.value);
            }}
          />
        </div>
        <select
          value={selected.column}
          onChange={(e) => setSelected({ ...selected, column: e.target.value })}
        >
          <option value="">Selecione uma coluna</option>
          {['PMAX12', 'TMIN18', 'TMAX18'].filter(tratarOpcoes).map((column) => (
            <option value={column} key={column}>
              {column}
            </option>
          ))}
        </select>
        <select
          value={selected.condition}
          onChange={(e) =>
            setSelected({ ...selected, condition: e.target.value })
          }
        >
          <option value="">Selecione uma condição</option>
          <option value=">">MAIOR DO QUE</option>
          <option value="<">MENOR DO QUE </option>
          <option value="=">IGUAL </option>
        </select>
        <input
          placeholder="Digite o valor"
          type="text"
          id=""
          name="filterValue"
          value={selected.value}
          onChange={(e) => setSelected({ ...selected, value: e.target.value })}
        />
        <div className="buttons">
          <button
            className="add"
            onClick={() => {
              setSelectedFilters([...selectedFilters, selected]);
              setSelected({
                column: '',
                condition: '',
                value: '',
              });
            }}
          >
            ADICIONAR
          </button>
          <button
            className="clear"
            onClick={() => {
              setSelectedFilters([]);
              setSelected({
                column: '',
                condition: '',
                value: '',
              });
            }}
          >
            LIMPAR
          </button>
        </div>
      </header>
      {selectedFilters.map((filter, index) => (
        <div className="selectedFilters" key={index}>
          <button
            onClick={() => {
              const cloneArray = [...selectedFilters];
              cloneArray.splice(index, 1);
              setSelectedFilters(cloneArray);
            }}
          >
            𝙭
          </button>
          <span>
            {filter.column} {filter.condition} {filter.value}
          </span>
        </div>
      ))}
      {/* table */}
      <table>
        <thead>
          <tr>
            <th>CAPITAL</th>
            <th>TEMP MÍN</th>
            <th>TEMP MÁX</th>
            <th>CHUVA</th>
          </tr>
        </thead>
        <tbody>
          {DATA.filter((el) =>
            el.CAPITAL.toLowerCase().includes(cityInput.toLowerCase())
          )
            .filter(tratarDados)
            .map((dados) => (
              <tr key={dados.CAPITAL}>
                <td>{dados.CAPITAL}</td>
                <td>{dados.TMIN18}</td>
                <td>{dados.TMAX18}</td>
                <td>{dados.PMAX12}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default FiltroChuvaNested;
