import { useState,useEffect,useRef } from "react";
import './styles/Products.css'
const Products = ()=>{
    const [apiUrl, setApi_url] = useState('http://127.0.0.1:8000/api/products/');
    const [data,setData] = useState([])
    const [prevUrl, setPrevUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const count = useRef(0);
    const productsLoading = document.querySelector('.products-loading')
    useEffect(()=>{
      const timeoutId = setTimeout(() => {
        loaddata()
        productsLoading.classList.add('invisible')
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
        <div className="products-area">
          <ul className="products-list">
            <li className="loading-area products-loading">
                <div className="loading"></div>
            </li>
              {data.map((item, index) => (
                
                <li key={index}>
                  {item.title}{console.log(item)}
                </li>
              ))}
          </ul>
          <h1>Render Count: {count.current}</h1>   
          <br />
          <button className="prev inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900" onClick={prevdata} disabled={!prevUrl}>prev</button>
          <button className="next" onClick={nextdata} disabled={!nextUrl}>next</button>
        </div>
      </>
    );
}

export default Products