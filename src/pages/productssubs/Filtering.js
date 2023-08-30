import { useEffect, useRef, useState } from 'react';
import { Card, LoadingCard, hrStyle } from '../templates';
import { apiUrl } from '../../urls';
import { Link, Outlet } from 'react-router-dom';
import './filtering.css'
import axios from 'axios';

export const Filter = (props) => {

  const [categories,setCategories] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [price_lt, setPriceLt] = useState('')
  const [price_gt, setPriceGt] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('');
  const [alertValue,setAlertValue] = useState("")
  const isFirstRender = useRef(true);

  const search = () => {
    if (searchValue.trim() === '' && (price_gt==='' || price_gt<0) && (price_lt==='' || price_lt<0) && selectedCategory=='') {
      setAlertValue("Please recheck check the search fields")
      return
    }

    if (price_gt<0 || price_lt<0) {
      setAlertValue("Please recheck check the search fields")
      return
    }

    props.loading(true)
    props.setProductsUrl(`${apiUrl}/api/products/?search=${searchValue}&category=${selectedCategory}&price__gt=${price_gt}&price__lt=${price_lt}`)
  }

  const clear = ()=>{
    if(searchValue === '' && price_lt =='' && price_gt =='' && selectedCategory ==''){
      return;
    }
    
    if(props.currentUrl === `${apiUrl}/api/products/?ordering=-id`){
      return;
    }
    props.loading(true)
    props.setProductsUrl(`${apiUrl}/api/products/?ordering=-id`)
    setSearchValue('')
    setPriceLt('')
    setPriceLt('')
    setSelectedCategory('')
  }

  useEffect(()=>{
    if (isFirstRender.current) {
      // Ignore the effect on the first render
      isFirstRender.current = false;
      return;
    }

    if(alertValue===''){
      return;
    }
    const t = setTimeout(() => {
      const alertHtml = document.querySelector('.alert')
      alertHtml.classList.remove('invisible')
    }, 2000);
    return () => {
      clearTimeout(t); 
    };
  },[alertValue])


  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl + '/api/category/');
      const categoryData = response.data;
      setCategories(categoryData); // Update the 'categories' state
    } catch (err) {
      setAlertValue("Category : " + err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  
  return (
    <>
        
        <div className="alert absolute invisible">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{alertValue}</span>
            <div>
              <button onClick={e => e.target.parentElement.parentElement.classList.add('invisible')} className="btn btn-sm bg-error">Close</button>
            </div>
        </div>

      <section className="filtering-section mt-10">
        <select className="category select w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}>
          <option disabled value="">Category</option>
          {categories.map(c=>(
            <option key = {c.id} onChange={e=> setSelectedCategory(e.target.value)} value={c.id} >{c.title}</option>
          ))
          }
        </select>
        <input
          type="text"
          placeholder="Products Search"
          className="search-input input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <br />
        <div className="price-filter">
        <input
          type="number"
          placeholder="Price Greater Than"
          className="price-gt input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={price_gt}
          onChange={(e) => setPriceGt(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price Less Than"
          className="price-lt input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={price_lt}
          onChange={(e) => setPriceLt(e.target.value)}
        />
        </div>
        <br />
        <div className="search-btn-area">
        <button className="search bg-primary inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900" onClick={search}>Search</button>
        <button className="clear-search bg-danger inline-block cursor-pointer rounded-md bg-red-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-red-900" onClick={clear}>Clear</button>
        </div>

      </section>
    </>
  );
};
