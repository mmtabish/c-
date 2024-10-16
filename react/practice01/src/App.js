import logo from './logo.svg';
import './App.css';

function App() {

  const fruits = [
    "apple",
    "aopricot",
    "banana",
    "blueberry",
    "cherry",
    "canberry",
    "Fig",
    "Grape",
  ];

  return (
    <div className="App">
      <input></input>
      {fruits.map((fruits) => {
        return <p>{fruits}</p>
      } )}
    </div>
  );
}

export default App;
