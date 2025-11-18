import { useState } from 'react'
import { createBrowserRouter, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import AboutUs from './components/AboutUs'
import ContagePage from './components/ContagePage'
import Portfolio from './components/Portfolio'
import ServicesPage from './components/ServicesPage'

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
          <Route path="/services" element={<ServicesPage />} /> 
        </Routes>
      </div>
    </>
      
  )
}

export default App
