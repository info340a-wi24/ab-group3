import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import { NavBar } from './NavBar';
import { CreatePost } from './Create';
import { Home } from './Home';
import { FooterDetail } from './Footer';

function App() {
  let windowWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth;
  })

  const[data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
  return (
    <div className="flex-container general-layout">
        <header>
          <NavBar />
        </header>
        <main>
            <Routes>
              <Route index element={<Home />} />
              <Route path="create" element={<CreatePost />} />
            </Routes>
        </main>
        <footer>
            <FooterDetail />
        </footer>
    </div>
  )
}

export default App
