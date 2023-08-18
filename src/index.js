import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
function Car(props) {
    return <li>I am a { props.brand }</li>;
  }
  
  function Garage() {
    const cars = [
        { id: 1, brand: 'Ford' },
        { id: 2, brand: 'BMW' },
        { id: 3, brand: 'Audi' }
      ];
    
      const carComponents = [];
    
      for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        carComponents.push(<Car key={car.id} brand={car.brand} />);
      }
    return (
      <>
        <h1>Who lives in my garage?</h1>
        <ul>
            {carComponents}
        </ul>
      </>
    );
  }
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);

