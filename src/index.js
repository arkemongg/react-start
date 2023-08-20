import { useState,useEffect,useRef } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./todos";

const App = () => {
  const [apiUrl, setApi_url] = useState('http://127.0.0.1:8000/api/products/');
  const [data,setData] = useState([])
  const [prevUrl, setPrevUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const count = useRef(0);

  useEffect(()=>{
    const timeoutId = setTimeout(() => {
      loaddata()
    }, 1000);
    count.current = count.current + 1;
    return () => {
      clearTimeout(timeoutId); // Clean up the timeout when the component unmounts or the effect re-runs
    };
  },[apiUrl])
  function loaddata(){
    fetch(apiUrl)
    .then(response => response.json())
    .then(data=>{
      setPrevUrl(data.previous);
      setNextUrl(data.next);
      setData(prevData=>[...data.results])
    }).catch(error => {
      // Handle fetch errors here
      console.error('Fetch error:', error);
      // You can set a state variable to indicate the error and display a message to the user
    });
  }
  const prevdata = ()=>{
    if(prevUrl){
      setApi_url(`${prevUrl}`)
    }
  }
  const nextdata = ()=>{
    if(nextUrl){
      setApi_url(`${nextUrl}`)
    }
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
        <h1>Render Count: {count.current}</h1>   
        <br />
        <button className="prev" onClick={prevdata} disabled={!prevUrl}>prev</button>
        <button className="next" onClick={nextdata} disabled={!nextUrl}>next</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);