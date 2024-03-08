import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import { navBar } from './NavBar';
import { CreatePost } from './Create';
import { Discovery } from './Discovery';
import { Following } from './Following';
import { Saved } from './Saved';
import { Recent } from './Recent'

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
            <navBar />
        </header>
        <main>
            <div class="flex-container home-option">
                <Link id="chosen-option" class="NomNom-button" to="discovery">Discover</Link>
                <Link to="following" class="NomNom-button">Following</Link>
                <Link to="saved" class="NomNom-button">Saved</Link>
                <Link to="recent" class="NomNom-button">Recent</Link>
            </div>
            <Routes>
                <Route path="discovery" element={<Discovery />} >
                    <Route index element={<Discovery />} />
                </Route>
                <Route path="following" element={<Following />} />
                <Route path="saved" element={<Saved />} />
                <Route path="recent" element={<Recent />} />
                <Route path="*" element={<Navigate to="discovery" />} />
            </Routes>
        </main>
        <footer>
            <div className="flex-container footer-container">
                <p>
                    <a href="mailto:jah0311@uw.edu, ptle04@uw.edu, phucn24@uw.edu, tlu2004@uw.edu">
                        <span className="material-icons">email</span>
                        contact@nomnom.com
                    </a>
                </p>
                <p>&copy; NomNom 2024</p>
            </div>
        </footer>
    </div>
  )
}

export default App
