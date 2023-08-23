import { useState, useEffect, useRef } from "react";
import './styles/Products.css'
import { Title,Card } from "./templates.js";

const Products = () => {
  Title("Products")
  const [apiUrl, setApi_url] = useState('http://127.0.0.1:8000/api/products/?ordering=-created_at');
  const [data, setData] = useState([])
  const [prevUrl, setPrevUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const count = useRef(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loaddata()
      const productsLoading = document.querySelector('.products-loading')
      productsLoading.classList.add('invisible')
    }, 1000);
    count.current = count.current + 1;
    return () => {
      clearTimeout(timeoutId); // Clean up the timeout when the component unmounts or the effect re-runs
    };
  }, [apiUrl])
  function loaddata() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setPrevUrl(data.previous);
        setNextUrl(data.next);
        setData(prevData => [...data.results])
      }).catch(error => {

      });
  }
  const prevdata = () => {
    if (prevUrl) {
      setApi_url(`${prevUrl}`)
    }
  }
  const nextdata = () => {
    if (nextUrl) {
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
              {console.log(item)}
              <Card img={item.image} title={item.title} description = {item.description}/>
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