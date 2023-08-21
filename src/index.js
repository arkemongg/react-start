import { useState,useEffect,useRef } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./todos";
import Navigation from "./nav";
import './index.css'
import { Validate } from "./validate";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);