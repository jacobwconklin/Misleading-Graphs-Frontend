import './App.scss';
import Graph from './Components/Graph/Graph';
import SiteHeader from './Components/Header/SiteHeader';
import Information from './Components/Information/Information';

function App() {
  return (
    <div className="App">
      <SiteHeader />
      <Information />
      <Graph />
    </div>
  );
}

export default App;
