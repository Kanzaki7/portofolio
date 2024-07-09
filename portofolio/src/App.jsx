import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MainTitle from './pages/MainTitle'
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  const [enter, setEnter] = React.useState(false)

  return (
    <main className='bg-slate-300/20'>
        <Router>
            <Routes>
              {enter == false ? 
                <Route path='/' element={<MainTitle enter={enter} setEnter={setEnter} />} />
                : <Route path='/' element={<Home />} />
                }
                <Route path='/' element={<Home />} />
                {/* <Route path='/about' element={<h1>About</h1>} />
                <Route path='/contact' element={<h1>Contact</h1>} /> */}
            </Routes>
            <Analytics />
        </Router>
    </main>
  )
}

export default App
