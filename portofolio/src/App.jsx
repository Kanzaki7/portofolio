import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <main className='bg-slate-300/20'>
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/about' element={<h1>About</h1>} />
                <Route path='/contact' element={<h1>Contact</h1>} /> */}
            </Routes>
        </Router>
    </main>
  )
}

export default App
