import React, { useState, useEffect } from 'react'

import { createDiscoveryColumns } from './discovery'
import {CreatePost} from './create';

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
            <nav className="flex-container navbar">
                <a href='index.html'>
                    <img src={"../../img/logo.jpg"} alt='logo' width='80px' />
                  </a>
                <div className="flex-container home-explore">
                <a className="NomNom-button active" href="index.html">Home</a>
                <a href="explore.html">Explore</a>
                <a href="create.html">Create</a>
                </div>
                <div id="searchbar" className="flex-container">
                    <form method="get" action="">
                        <div className="search-fields">
                            <div className="search-term"><input type="text" placeholder="Search:" required /></div>
                            <div className="search-term"><input type="text" placeholder="Location:" /></div>
                            <div className="search-term" id="search-btn-cover">
                                <button className="search-btn" type="submit">
                                    <div id="search-btn-circle"></div>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex-container login-signup">
                    <a href="login.html">Login</a>
                    <a href="signup.html">Sign Up</a>
                </div>
                <a className="user-profile hidden" href="personalP.html">
                    <img aria-label="user-profile" className="user-profile-img" src="./data/img/nikocado.webp" alt="user-profile-img" />
                </a>
            </nav>
        </header>
        <main>
            <div className="flex-container home-option">
                <a id="chosen-option" className="NomNom-button" href="index.html">Discover</a>
                <a href="following.html" className="NomNom-button">Following</a>
                <a href="saved.html" className="NomNom-button">Saved</a>
                <a href="recents.html" className="NomNom-button">Recents</a>
            </div>
            <createDiscoveryColumns photoGallery windowWidth={windowWidth}/>
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
