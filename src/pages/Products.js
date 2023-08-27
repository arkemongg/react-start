import { useState, useEffect, useRef,useLayoutEffect } from "react";
import './styles/Products.css'
import { Title, Card, LoadingCard, hrStyle } from "./templates.js";
import { Filter } from "./productssubs/Filtering";
import { apiUrl } from "../urls";
import axios from "axios";
const Products = () => {
  Title("Products")
  const [productsUrl, setProductsUrl] = useState(`${apiUrl}/api/products/?ordering=-id`);
  const [data, setData] = useState([])
  const [prevUrl, setPrevUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchProductLoading, setfetchProductLoading] = useState(true);
  const [animateItems, setAnimateItems] = useState(false);
  const count = useRef(0);

  const productsListRef = useRef(null);

  function scrollToProductsList() {
    if (productsListRef.current) {
      productsListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  const NoProducts = ()=>{
      return (
        <>
          <h1 className="text-center text-2xl mt-4">No products available</h1>
        </>
      )
  }
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loaddata()
      setfetchProductLoading(false)
    }, 2000);
    count.current = count.current + 1;
    return () => {
      clearTimeout(timeoutId); // Clean up the timeout when the component unmounts or the effect re-runs
    };
  }, [productsUrl])

      // Use useLayoutEffect to trigger animations after the initial layout
      useLayoutEffect(() => {
        if (!fetchProductLoading) {
          setAnimateItems(true); // Set the animation flag to true
        }
      }, [fetchProductLoading]);

  function loaddata() {
    fetch(productsUrl)
      .then(response => response.json())
      .then(data => {
        setPrevUrl(data.previous);
        setNextUrl(data.next);
        setData(prevData => [...data.results])
      }).catch(error => {
        console.log(error);
      });
  }

  const prevdata = () => {
    if (prevUrl) {
      setfetchProductLoading(true);
      setProductsUrl(prevUrl);
      scrollToProductsList();
    }
  }
  const nextdata = () => {
    if (nextUrl) {
      setfetchProductLoading(true);
      setProductsUrl(nextUrl);
      scrollToProductsList();
    }
  }
  return (
    <>
      <hr />
      <div className="products-area m-auto" ref={productsListRef}>
        <div className="text-4xl text-center p-5">Products</div>
        <p className='' style={hrStyle}>
        </p>
        <Filter currentUrl = {productsUrl} setProductsUrl={setProductsUrl} loading = {setfetchProductLoading}/>
        <ul className="products-list" >
          {fetchProductLoading ? (
            Array.from({ length: 8 }, (_, index) => <LoadingCard key={index} />)
          ) : data.length === 0 ? (
            <NoProducts/>
          ) : (
            
            data.map((item, index) => (
              
              <Card
                key={index}
                img={item.image}
                title={item.title}
                description={item.description}
                super = {item.super_seller}
                verified = {item.is_verified}
                price = {item.price}
              />
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