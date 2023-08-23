import { useEffect } from 'react';
import './styles/Home.css'
import { Title } from './templates.js';


const Home = () => {
    Title("Home")
    return (
      <>
      <section className="home-section">
      <h1>Home</h1>
      </section>
      </>
    );
  };
  
  export default Home;