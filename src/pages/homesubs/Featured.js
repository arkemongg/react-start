import { useEffect, useRef, useState } from 'react';
import { Card,LoadingCard,hrStyle} from '../templates';
import { apiUrl } from '../../urls';
import { Link, Outlet } from 'react-router-dom';


export const Featured = () => {


    const [fetauredProductUrl,setFetauredProductUrl] = useState(`${apiUrl}/api/featured/`)
    const [data, setData] = useState([])
    const [prevUrl, setPrevUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [featuredProductLoading, setProductLoading] = useState(true);
    const count = useRef(0);
    return (
      <>
      <section className="featured-section">
      <h1 className='text-4xl text-center p-5'>Featured Items</h1>
      <p className='' style={hrStyle}>
      </p>

     <div className="featured-products-area m-auto">
        <ul className="products-list">
            {featuredProductLoading?(
                Array.from({ length: 8 }, (_, index) => <LoadingCard key={index} />)
                ):
                (
                    <Card/>
                )
            }
        </ul>
        <Link to='/products' className='block text-4xl text-center p-5 underline underline-offset-4'>View All </Link>
     </div>
      </section>
      <Outlet />
      </>
    );
  };
