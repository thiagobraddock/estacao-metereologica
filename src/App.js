import './App.css';
import FiltroChuvaNested from './components/FiltroChuva/FiltroChuvaNested';
import HeaderInfo from './components/HeaderInfo';

function App() {
  return (
    <div className="wrapper">
      <HeaderInfo />
      <FiltroChuvaNested />
    </div>
  );
}

export default App;
