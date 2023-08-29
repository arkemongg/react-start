import logo from './logo.svg';
import './App.css';
import Todos from "./todos";
import Navigation from "./nav";
import { Validate } from "./validate";
import Products from "./pages/Products";
import Buynow from './pages/Buynow';
import Home from "./pages/home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";


import ScrollToTop from "./ScrollToTop";


import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useEffect, useState } from 'react';

function Layout({ children }) {
  return (
    <>
      <Navigation />
    </>
  );
}



const App = () => {

  return (
    <BrowserRouter>
      <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route  path="buynow/:id/:slug" element={<Buynow />} />
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      </ScrollToTop>
    </BrowserRouter>
  )
};
export default App;
