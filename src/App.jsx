import { useState } from 'react'
import { createBrowserRouter, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import AboutUs from './components/AboutUs'
import ContagePage from './components/ContagePage'
import Portfolio from './components/Portfolio'

function App() {
  return (
   <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<ContagePage />} />
          <Route path="/book" element={<ContagePage />} /> 
          {/* you can create a BookPage later */}
        </Routes>
      </div>
    </>
      
  )
}

export default App
