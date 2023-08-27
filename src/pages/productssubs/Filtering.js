import { useEffect, useRef, useState } from 'react';
import { Card, LoadingCard, hrStyle } from '../templates';
import { apiUrl } from '../../urls';
import { Link, Outlet } from 'react-router-dom';
import './filtering.css'

export const Filter = (props) => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('');
  const search = () => {
    if (searchValue.trim() == '') {
      setSearchValue('')
      return
    }

    props.loading(true)
    props.setProductsUrl(`${apiUrl}/api/products/?search=${searchValue}`)

  }

  return (
    <>
      <section className="filtering-section mt-10">
        <select className="category select select-success w-full" value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}>
          <option disabled value="">Category</option>
          <option value="Han Solo">Han Solo</option>
          <option value="Greedo">Greedo</option>
        </select>
        <input
          type="text"
          placeholder="Type here"
          className="search-input input input-bordered w-full"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <br />
        <button className="search bg-primary inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900" onClick={search}>Search</button>
      </section>
    </>
  );
};
