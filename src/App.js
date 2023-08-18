import logo from './logo.svg';
import './App.css';

function Car(props){
  //console.log(props,"props");
  return <li>hi {props.brand}</li>
}

function App() {
  const cars = ['Ford', 'BMW', 'Audi'];
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car) => <Car brand={car} />)}
      </ul>
    </>
  );
}

export default App;
