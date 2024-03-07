import React, { useState, useEffect } from 'react'

import { createDiscoveryColumns } from './discovery'
import CreatePost from './create';

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
    <div class="flex-container general-layout">
        <header>
            <nav class="flex-container navbar">
                <a href='index.html'>
                    <img src={"../../img/logo.jpg"} alt='logo' width='80px' />
                  </a>
                <div class="flex-container home-explore">
                <a class="NomNom-button active" href="index.html">Home</a>
                <a href="explore.html">Explore</a>
                <a href="create.html">Create</a>
                </div>
                <div id="searchbar" class="flex-container">
                    <form method="get" action="">
                        <div class="search-fields">
                            <div class="search-term"><input type="text" placeholder="Search:" required /></div>
                            <div class="search-term"><input type="text" placeholder="Location:" /></div>
                            <div class="search-term" id="search-btn-cover">
                                <button class="search-btn" type="submit">
                                    <div id="search-btn-circle"></div>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="flex-container login-signup">
                    <a href="login.html">Login</a>
                    <a href="signup.html">Sign Up</a>
                </div>
                <a class="user-profile hidden" href="personalP.html">
                    <img aria-label="user-profile" class="user-profile-img" src="./data/img/nikocado.webp" alt="user-profile-img" />
                </a>
            </nav>
        </header>
        <main>
            <div class="flex-container home-option">
                <a id="chosen-option" class="NomNom-button" href="index.html">Discover</a>
                <a href="following.html" class="NomNom-button">Following</a>
                <a href="saved.html" class="NomNom-button">Saved</a>
                <a href="recents.html" class="NomNom-button">Recents</a>
            </div>
            <createDiscoveryColumns photoGallery windowWidth={windowWidth}/>
        </main>
        <footer>
            <div class="flex-container footer-container">
                <p>
                    <a href="mailto:jah0311@uw.edu, ptle04@uw.edu, phucn24@uw.edu, tlu2004@uw.edu">
                        <span class="material-icons">email</span>
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
