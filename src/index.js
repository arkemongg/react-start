import { useState,useEffect } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./todos";

const App = () => {
  const [api_url, setApi_url] = useState('http://127.0.0.1:8000/api/products/');
  const [data,setData] = useState([{title:50}])

  useEffect(()=>{
    const timeoutId = setTimeout(() => {
      loaddata()
    }, 1000);
    return () => {
      clearTimeout(timeoutId); // Clean up the timeout when the component unmounts or the effect re-runs
    };
  },[api_url])
  function loaddata(){
    fetch(api_url)
    .then(response => response.json())
    .then(data=>{
      setData(prevData=>[...prevData,...data.results])
    })
  }
  const nextdata = ()=>{
    setApi_url('https://jsonplaceholder.typicode.com/todos/2')
  }
  return (
    <>
      <hr />
      <div>
      <ul>
          {data.map((item, index) => (
            
            <li key={index}>
              {item.title}{console.log(item)}
            </li>
          ))}
        </ul>

        <br />
        <button onClick={loaddata}>+</button>
        <button onClick={nextdata}>next</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);