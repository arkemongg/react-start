import { useState,useEffect } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./todos";

const App = () => {
  const [api_url, setApi_url] = useState('http://127.0.0.1:8000/api/products/');
  const [data,setData] = useState([{title:50}])
  const [prevUrl, setPrevUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  

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
      setPrevUrl(data.previous);
      setNextUrl(data.next);
      setData(prevData=>[...prevData,...data.results])
    }).catch(error => {
      // Handle fetch errors here
      console.error('Fetch error:', error);
      // You can set a state variable to indicate the error and display a message to the user
    });
  }
  const nextdata = ()=>{
    
  setApi_url(`${nextUrl}`)
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
        <button className="next" onClick={nextdata}>next</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);