import './App.css';
import FiltroChuvaNested from './components/FiltroChuva/FiltroChuvaNested';
/* import FiltroChuva from './components/FiltroChuva/FiltroChuva'; */
import HeaderInfo from './components/HeaderInfo';

function App() {
  return (
    <div className="wrapper">
      <HeaderInfo />
      {/* <FiltroChuva /> */}
      <FiltroChuvaNested />
    </div>
  );
}

export default App;
