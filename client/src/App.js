import logo from './logo.svg';
import './App.css';
import Shazam from './components/Shazam';

function App() {
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">
      <i className="mx-4 fa-solid fa-microphone-lines"></i>Start Bopping
      </h4>
      <Shazam />
    </div>
  );
}

export default App;
