import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Cart from './pages/Cart'

function App () {
  return (
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
    </Routes>
  )
}

export default App;