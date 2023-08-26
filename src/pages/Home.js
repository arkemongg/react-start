import { useEffect } from 'react';
import './styles/Home.css'
import { Title } from './templates.js';
import {Featured} from './homesubs/Featured.js'

const Home = () => {
    Title("Home")
    return (
      <>
      <section className="home-section">
      <Featured />
      </section>
      </>
    );
  };
  
  export default Home;