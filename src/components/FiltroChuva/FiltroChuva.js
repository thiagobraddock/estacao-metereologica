import React, { useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import './style.css';
const DATA = [
  {
    CAPITAL: 'ARACAJU',
    TMIN18: '*',
    TMAX18: '*',
    UMIN18: '*',
    PMAX12: '*',
  },
  {
    CAPITAL: 'BELEM',
    TMIN18: '*',
    TMAX18: '*',
    UMIN18: '*',
    PMAX12: '*',
  },
  {
    CAPITAL: 'BELO HORIZONTE',
    TMIN18: '18.1',
    TMAX18: '28.6',
    UMIN18: '88',
    PMAX12: '9.3',
  },
  {
    CAPITAL: 'BOA VISTA',
    TMIN18: '*',
    TMAX18: '*',
    UMIN18: '*',
    PMAX12: '0',
  },
  {
    CAPITAL: 'BRASILIA',
    TMIN18: '18.5',
    TMAX18: '27.9',
    UMIN18: '52',
    PMAX12: '0',
  },
  {
    CAPITAL: 'CAMPO GRANDE',
    TMIN18: '24.7',
    TMAX18: '28.1',
    UMIN18: '78',
    PMAX12: '2.8',
  },
  {
    CAPITAL: 'CUIABA',
    TMIN18: '23.9',
    TMAX18: '32.2',
    UMIN18: '79',
    PMAX12: '1.2',
  },
  {
    CAPITAL: 'CURITIBA',
    TMIN18: '*',
    TMAX18: '*',
    UMIN18: '*',
    PMAX12: '*',
  },
  {
    CAPITAL: 'FLORIANOPOLIS',
    TMIN18: '20.8',
    TMAX18: '26.8',
    UMIN18: '56',
    PMAX12: '.6',
  },
  {
    CAPITAL: 'FORTALEZA',
    TMIN18: '23.6',
    TMAX18: '31.7',
    UMIN18: '54',
    PMAX12: '.4',
  },
  {
    CAPITAL: 'GOIANIA',
    TMIN18: '20.1',
    TMAX18: '30.3',
    UMIN18: '47',
    PMAX12: '2',
  },
  {
    CAPITAL: 'JOAO PESSOA',
    TMIN18: '23.7',
    TMAX18: '32.3',
    UMIN18: '58',
    PMAX12: '1.4',
  },
  {
    CAPITAL: 'MACAPA',
    TMIN18: '*',
    TMAX18: '*',
    UMIN18: '*',
    PMAX12: '*',
  },
  {
    CAPITAL: 'MACEIÓ',
    TMIN18: '23.5',
    TMAX18: '31.8',
    UMIN18: '*',
    PMAX12: '*',
  },
  {
    CAPITAL: 'MANAUS',
    TMIN18: '23.7',
    TMAX18: '28.9',
    UMIN18: '71',
    PMAX12: '29.2',
  },
  {
    CAPITAL: 'NATAL',
    TMIN18: '23.3',
    TMAX18: '31.3',
    UMIN18: '71',
    PMAX12: '0',
  },
  {
    CAPITAL: 'PALMAS',
    TMIN18: '*',
    TMAX18: '*',
    UMIN18: '*',
    PMAX12: '*',
  },
  {
    CAPITAL: 'PORTO ALEGRE',
    TMIN18: '19.7',
    TMAX18: '29.7',
    UMIN18: '58',
    PMAX12: '0',
  },
  {
    CAPITAL: 'PORTO VELHO',
    TMIN18: '23.9',
    TMAX18: '29.1',
    UMIN18: '66',
    PMAX12: '4.4',
  },
  {
    CAPITAL: 'RECIFE',
    TMIN18: '*',
    TMAX18: '*',
    UMIN18: '*',
    PMAX12: '*',
  },
  {
    CAPITAL: 'RIO BRANCO',
    TMIN18: '*',
    TMAX18: '*',
    UMIN18: '*',
    PMAX12: '*',
  },
  {
    CAPITAL: 'RIO DE JANEIRO',
    TMIN18: '22.7',
    TMAX18: '30.4',
    UMIN18: '58',
    PMAX12: '19.4',
  },
  {
    CAPITAL: 'SALVADOR',
    TMIN18: '26',
    TMAX18: '32.2',
    UMIN18: '70',
    PMAX12: '0',
  },
  {
    CAPITAL: 'SAO LUIS',
    TMIN18: '22.7',
    TMAX18: '30.5',
    UMIN18: '60',
    PMAX12: '',
  },
  {
    CAPITAL: 'SAO PAULO',
    TMIN18: '18.1',
    TMAX18: '23.5',
    UMIN18: '68',
    PMAX12: '66.4',
  },
  {
    CAPITAL: 'TERESINA',
    TMIN18: '',
    TMAX18: '',
    UMIN18: '',
    PMAX12: '',
  },
  {
    CAPITAL: 'VITORIA',
    TMIN18: '22.9',
    TMAX18: '34',
    UMIN18: '52',
    PMAX12: '0',
  },
];

function FiltroChuva() {
  // estado generico para os inputs
  const [selected, setSelected] = useState({
    column: '',
    condition: '',
    value: '',
  });

  // estado para o array de filtros
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    console.log('FILTRO SELECIONADO: ', selectedFilters);
  }, [selectedFilters]);

  const tratarDados = (linha) => {
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
          bools.push(linha[filter.column] == filter.value);
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
        <select
          value={selected.column}
          onChange={(e) => setSelected({ ...selected, column: e.target.value })}
        >
          <option value="">Selecione uma opção</option>
          {['CAPITAL', 'PMAX12', 'TMIN18']
            .filter(tratarOpcoes)
            .map((column) => (
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
          <option value="">Selecione uma opção</option>
          <option value=">">MAIOR DO QUE</option>
          <option value="<">MENOR DO QUE </option>
          <option value="=">IGUAL </option>
        </select>

        <input
          type="text"
          id=""
          name="id"
          value={selected.value}
          onChange={(e) => setSelected({ ...selected, value: e.target.value })}
        />
        <button
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
      </header>
      {selectedFilters.map((filter, index) => (
        <div className="filters" key={index}>
          <button
            className="limpar"
            onClick={() => {
              const cloneArray = [...selectedFilters];
              cloneArray.splice(index, 1);
              setSelectedFilters(cloneArray);
            }}
          >
            <BsFillTrashFill />
          </button>
          {filter.column} {filter.condition} {filter.value}
        </div>
      ))}
      {/* table */}
      <table>
        <thead>
          <tr>
            <th>ESTADO</th>
            <th>TEMP MÍN</th>
            <th>TEMP MÁX</th>
            <th>CHUVA</th>
          </tr>
        </thead>
        <tbody>
          {DATA.filter(tratarDados).map((dados) => (
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

export default FiltroChuva;
