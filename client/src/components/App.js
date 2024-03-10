import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import { NavBar } from './NavBar';
import { CreatePost } from './create';
import { Profile } from './Profile';
import { FooterDetail } from './Footer';

// Home Components
import { Discover } from './home/Discover';
import { Following } from './home/Following';
import { Saved } from './home/Saved';
import { Recent } from './home/Recent';
import { OpenPost } from './home/OpenPost'

function App() {
  return (
    <div className="flex-container general-layout">
        <header>
          <NavBar />
        </header>
        <main>
            <Routes>
              <Route path="discover" element={<Discover />} >
                <Route path="/discover/:postId" element={<OpenPost />} />
              </Route>
              <Route path="following" element={<Following />} />
              <Route path="saved" element={<Saved />} />
              <Route path="recent" element={<Recent />} />
              <Route path="create" element={<CreatePost />} />
              <Route path="/:profileId" element={<Profile />} />
              <Route path="*" element={<Navigate to="discover" />} />
            </Routes>
        </main>
        <footer>
            <FooterDetail />
        </footer>
    </div>
  )
}

export default App
