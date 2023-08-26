import { useState, useEffect, useRef } from "react";
import './styles/Products.css'
import { Title, Card, LoadingCard } from "./templates.js";

const Products = () => {
  
  window.scrollTo(0, 0);
  
  Title("Products")
  const [productsUrl, setProductsUrl] = useState('http://127.0.0.1:8000/api/products/?ordering=-id');
  const [data, setData] = useState([])
  const [prevUrl, setPrevUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchProductLoading, setfetchProductLoading] = useState(true);
  const count = useRef(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loaddata()
      setfetchProductLoading(false)
    }, 1000);
    count.current = count.current + 1;
    return () => {
      clearTimeout(timeoutId); // Clean up the timeout when the component unmounts or the effect re-runs
    };
  }, [productsUrl])
  function loaddata() {
    fetch(productsUrl)
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
      setfetchProductLoading(true)
      setProductsUrl(`${prevUrl}`)
    }
  }
  const nextdata = () => {
    if (nextUrl) {
      setfetchProductLoading(true)
      setProductsUrl(`${nextUrl}`)
    }
  }
  return (
    <>
      <hr />
      <div className="products-area m-auto">
        <ul className="products-list ">
          {fetchProductLoading ? (
            Array.from({ length: 8 }, (_, index) => <LoadingCard key={index} />)
          ) : data.length === 0 ? (
            <h1 className="text-center text-2xl mt-4">No products available</h1>
          ) : (
            data.map((item, index) => (
              <Card key={index} img={item.image} title={item.title} description={item.description} />
            ))
          )}

        </ul>
        <h1>Render Count: {count.current}</h1>
        <br />
              <div className="btn-area flex justify-center p-10">
                <button className="prev bg-primary pl-20 pr-20 inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900" onClick={prevdata} disabled={!prevUrl}>prev</button>
                <button className="next ml-10 bg-primary pl-20 pr-20 inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900" onClick={nextdata} disabled={!nextUrl}>next</button>
              </div>
      </div>
    </>
  );
}

export default Products