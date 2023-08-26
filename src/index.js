import { useState,useEffect,useRef } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Footer from "./pages/Footer";
import Navigation from "./nav";

import './index.css'

const WithNav = ()=>{
  return (
    <>
        <App />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WithNav />);

const footer = ReactDOM.createRoot(document.getElementById('footer'));
footer.render(<Footer />);