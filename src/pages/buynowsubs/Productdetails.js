import { useState } from 'react';
import { apiUrl } from '../../urls.js'
import prodimage from './assets/1.jpg';
import prodimage2 from './assets/2.jpg';
import prodimage3 from './assets/3.jpg';

import './productsdetails.css'
import { hrStyle } from '../templates.js';

export const Details = () => {
  const [productImage, setProuductImage] = useState(prodimage)
  const [activeImage, setActiveImage] = useState('image1')
  return (
    <>
      <div className="buy-now-area">
        <div className="product-image-area">
          <div className="product-images">
            <img className='product-image' src={productImage} alt="" />
          </div>
          <div className="join product-image-btn pt-5">
            <button onClick={e => {
              setProuductImage(prodimage)
              setActiveImage('image1')
            }} className={`join-item btn ${activeImage === 'image1' ? 'btn-active' : ''}`}>Image1</button>
            <button onClick={e => {
              setProuductImage(prodimage2)
              setActiveImage('image2')
            }} className={`join-item btn ${activeImage === 'image2' ? 'btn-active' : ''}`}>Image2</button>
            <button onClick={e => {
              setProuductImage(prodimage3)
              setActiveImage('image3')
            }} className={`join-item btn ${activeImage === 'image3' ? 'btn-active' : ''}`}>Image3</button>
          </div>
        </div>

        <div className="product-title-area">
            <p className="product-title">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam assumenda inventore provident in velit nostrum iure tempora a sint tempore.
            </p>
        </div>
        <div className="product-description-area">
            <h1 className='text-2xl text-center p-4'>Description</h1>
            <p style={hrStyle }></p>
            <p className="product-description mt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis adipisci atque omnis, quas iste, aspernatur temporibus deleniti optio magni natus nisi doloremque quaerat suscipit. Voluptas, temporibus nam. Praesentium porro enim deserunt optio sit vero reiciendis, ea quo velit ad commodi a? Deleniti blanditiis ipsa molestiae enim pariatur velit in minima perspiciatis ratione. Atque ducimus necessitatibus fuga saepe velit consequuntur mollitia id maxime vel autem quisquam dolorem possimus magni provident, harum officia libero. Neque voluptatibus, adipisci facere vitae accusantium tempore nobis nam accusamus, officiis, fuga aut repellat reprehenderit beatae iste enim consequuntur corporis quia. A corrupti impedit incidunt ullam! Asperiores, molestias.
            </p>
        </div>
        <div className="seller-detals p-5">
          <button className='btn btn-primary'>Seller Profile</button>
          <button className='btn btn-primary ml-5'>Send Message</button>
        </div>
        <div className="buy-area p-5">
        <h1 className='text-2xl text-center p-4'>Product Details</h1>
          <p style={hrStyle }></p>
          <button className='btn bg-green-500 text-white'>Send Message</button>
        </div>
      </div>
    </>
  );
};
