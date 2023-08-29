import { useState } from 'react';
import { apiUrl } from '../../urls.js'
import prodimage from './assets/1.jpg';
import prodimage2 from './assets/2.jpg';
import prodimage3 from './assets/3.jpg';

import styles from './productsdetails.module.css'
import { hrStyle } from '../templates.js';

export const Details = () => {
  const [productImage, setProuductImage] = useState(prodimage)
  const [activeImage, setActiveImage] = useState('image1')
  const [quantity , setQuantity] = useState('')
  const [isValid, setIsValid] = useState(true);
  const handleInputChange = (event) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setQuantity(value);
      const parsedValue = parseInt(value);
      setIsValid(!isNaN(parsedValue) && Number.isInteger(parsedValue) && parsedValue > 0 &&value<65);
    }
  };
  const price = 20.99;
  return (
    <>
      <div className={styles.buyNowArea}>
        <div className="seller-verified-super flex justify-between">
            <p className=" p-1 px-3 rounded m-5 bg-success">Verified Seller</p>
            <p className=" p-1 px-3 rounded m-5 bg-success">Super Seller</p>
        </div>
        <div className={styles.productImageArea}>
          <div className={styles.productImages}>
            <img className={styles.productImage} src={productImage} alt="" />
          </div>
          <div className={`join ${styles.productImageBtn} pt-5`}>
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

        <div className={styles.productTitleArea}>
          <p className={styles.productTitle}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam assumenda inventore provident in velit nostrum iure tempora a sint tempore.
          </p>
          <h1 className={`text-3xl rounded mt-10 ${styles.price}`}>1 PI</h1>
        </div>

        <div className={styles.productDescriptionArea}>
          <h1 className='text-2xl text-center p-4'>Description</h1>
          <p style={hrStyle}></p>
          <p className={`${styles.productDescription} mt-5`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis adipisci atque omnis, quas iste, aspernatur temporibus deleniti optio magni natus nisi doloremque quaerat suscipit. Voluptas, temporibus nam. Praesentium porro enim deserunt optio sit vero reiciendis, ea quo velit ad commodi a? Deleniti blanditiis ipsa molestiae enim pariatur velit in minima perspiciatis ratione. Atque ducimus necessitatibus fuga saepe velit consequuntur mollitia id maxime vel autem quisquam dolorem possimus magni provident, harum officia libero. Neque voluptatibus, adipisci facere vitae accusantium tempore nobis nam accusamus, officiis, fuga aut repellat reprehenderit beatae iste enim consequuntur corporis quia. A corrupti impedit incidunt ullam! Asperiores, molestias.
          </p>
        </div>
        <div className={`${styles.sellerDetails} mt-5`}>
          <button className='btn btn-primary'>Seller Profile</button>
          <button className='btn btn-primary ml-5'>Send Message</button>
        </div>

        <div className={`${styles.checkoutArea}`}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-white">Inventory : </span>
              <span className="label-text-alt text-white">65 left</span>
            </label>
            <input type="number" value={quantity} onChange={handleInputChange} placeholder="Quantity" className="input input-bordered text-black w-full max-w-xs" />
            {isValid ? null : <p style={{ color: 'red' }}>Invalid input. Please enter a positive number or lower quantity.</p>}
          </div>
          <h1 className="text-4xl mt-5">Total : <p className={`${styles.totalPrice} inline-block text-right`}>{(quantity * price).toFixed(2)}</p> PI</h1>
          <div className="checkout-area">
            <button className='btn btn-primary mt-5'>Procceed to Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};
