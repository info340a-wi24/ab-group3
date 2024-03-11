import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import { NavBar } from './NavBar';
import { CreatePost } from './create';
import { Profile } from './Profile';
import { FooterDetail } from './Footer';

// Home Components
import { Discover } from './home/Discover';
import { Restaurants } from './home/Restaurant';
import { Saved } from './home/Saved';
import { Following } from './home/Following';
import { OpenPost } from './home/OpenPost'

// Footer Component
import { FooterDetail } from './Footer';

import { Login } from './pages/login'
import { auth } from "../index";
import { ProtectedRoute } from './routes/ProtectedRoute';
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>
  }
  return (
    <div className="flex-container general-layout">
        <header>
          <NavBar />
        </header>
        <main>
            <Routes>
              <Route index path = '/' element={<Login/>}></Route>
              <Route path = '/discover'
                element={
                  <ProtectedRoute user={user}>
                    <Discover></Discover>
                  </ProtectedRoute>
                } 
              ><Route path='/discover/:postId'
                element={
                  <ProtectedRoute user={user}>
                    <OpenPost></OpenPost>
                  </ProtectedRoute>
                } 
              ></Route>
              </Route>
              <Route path = '/following'
                element={
                  <ProtectedRoute user={user}>
                    <Following></Following>
                  </ProtectedRoute>
                } 
              ></Route>
              <Route path = '/saved'
                element={
                  <ProtectedRoute user={user}>
                    <Saved></Saved>
                  </ProtectedRoute>
                } 
              ></Route>
              <Route path = '/Recent'
                element={
                  <ProtectedRoute user={user}>
                    <Recent></Recent>
                  </ProtectedRoute>
                } 
              ></Route>
            </Routes>
          </main>
        <footer>
            <FooterDetail />
        </footer>
    </div>
  )
}

export default App
