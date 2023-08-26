import { useEffect, useRef, useState } from 'react';
import { Card,LoadingCard,hrStyle} from '../templates';
import { apiUrl } from '../../urls';
import { Link, Outlet } from 'react-router-dom';

export const Filter = (props) => {
    const search = ()=>{
        props.loading(true)
        props.setProductsUrl('http://127.0.0.1:8000/api/products/?search=a')
        
    }

    return (
      <>
      <section className="filtering-section mt-10">
        
        <button className="search btn glass text-blue" onClick={search}>Search</button>
      </section>
      </>
    );
  };
