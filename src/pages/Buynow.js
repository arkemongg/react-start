import { useEffect } from 'react';
import './styles/Home.css'
import { Title,hrStyle } from './templates.js';
import {Featured} from './homesubs/Featured.js'
import { useParams } from 'react-router-dom';
import { Details } from './buynowsubs/Productdetails.js'

const Buynow = () => {
    Title("Buy Now")
    const {id} = useParams()
    return (
      <>
      <section className="buy-now-section">
        <h1 className='text-4xl text-center p-4'>Products Details</h1>
        <p style={hrStyle }></p>
        <Details />
      </section>
      </>
    );
  };
  
  export default Buynow;