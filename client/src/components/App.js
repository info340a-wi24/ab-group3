import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

// Navbar Components
import { NavBar } from './pages/general/NavBar';
import { Profile } from './pages/Profile';
import { FooterDetail } from './pages/general/Footer';

// Home Components
import { Discover } from './home/Discover';
import { Eats } from './home/Eats';
import { Saved } from './home/Saved';
import { Following } from './home/Following';
import { OpenPost } from './miscellaneous/add-ons/OpenPost'

import { Login } from './pages/login'
import { auth } from "../index";
import { ProtectedRoute } from './routes/ProtectedRoute';
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, remove, get, update, set, onValue } from 'firebase/database';

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

  let uid = null;
  if (user) {
    uid = user.uid;
  }

  function savePost(postId) {
    let db = getDatabase();
    let savedRef = ref(db, "users/" + user.uid + "/saved");
    
    get(savedRef)
      .then((snapshot) => {
        let currentData = snapshot.val() || {};
        let dataArray = Object.keys(currentData);
        if (!dataArray.includes(postId + "")) {
          let newData = {
            ...currentData,
            [postId]: postId
          };
          update(savedRef, newData)
          .then(() => console.log("Post added to Saved successfully"))
          .catch(error => console.error("Error adding post to Saved: ", error));
        } else {
          let newData = {
            ...currentData
          }
          newData[postId] = null;
          update(savedRef, newData)
          .then(() => console.log("Post removed from Saved successfully"))
          .catch(error => console.error("Error removing post to Saved: ", error));
        }
      })
      .catch(error => console.error("Error getting saved: ", error));
  }

  function followRestaurant(restaurantId) {
    let db = getDatabase();
    let followingRef = ref(db, "users/" + user.uid + "/following");
    let followersRef = ref(db, "restaurants/" + restaurantId + "/followers")
    let followerState = false;

    get(followingRef)
      .then((snapshot) => {
        let currentData = snapshot.val() || {};
        let dataArray = Object.keys(currentData);
        if (!dataArray.includes(restaurantId + "")) {
          let newData = {
            ...currentData,
            [restaurantId]: restaurantId
          };
          update(followingRef, newData)
          .then(() => console.log("Restaurant followed successfully"))
          .catch(error => console.error("Error following restaurant: ", error));
          followerState = true;
        } else {
          let newData = {
            ...currentData
          }
          newData[restaurantId] = null;
          update(followingRef, newData)
          .then(() => console.log("Restaurant unfollowed successfully"))
          .catch(error => console.error("Error unfollowing restaurant: ", error));
        }
        return get(followersRef);
      })
      .then((snapshot) => {
        let currentData = snapshot.val();
        if (followerState) {
          currentData += 1;
          set(followersRef, currentData)
            .then(() => console.log("followed!"))
            .catch(error => console.error(error));
        } else {
          currentData -= 1;
          set(followersRef, currentData)
            .then(() => console.log("unfollowed!"))
            .catch(error => console.error(error));
        }
      })
      .catch(error => console.error("Error getting following", error));
  }

  function likePost(postId) {
    let db = getDatabase();
    let likedRef = ref(db, "users/" + user.uid + "/liked");
    let photoLikesRef = ref(db, "photos/" + postId + "/likes");
    let likeState = false;

    get(likedRef)
      .then((snapshot) => {
        let currentData = snapshot.val() || {};
        let dataArray = Object.keys(currentData);
        if (!dataArray.includes(postId + "")) {
          let newData = {
            ...currentData,
            [postId]: postId
          };
          update(likedRef, newData)
          .then(() => console.log("Post liked successfully"))
          .catch(error => console.error("Error liking post", error));
          likeState = true;
        } else {
          let newData = {
            ...currentData
          }
          newData[postId] = null;
          update(likedRef, newData)
          .then(() => console.log("Post unliked successfully"))
          .catch(error => console.error("Error liking post", error));
        }
      })
      .catch(error => console.error("Error getting liked", error));

    get(photoLikesRef)
      .then((snapshot) => {
        let currentData = snapshot.val();
        if (likeState) {
          currentData += 1;
          set(photoLikesRef, currentData)
            .then(() => console.log("liked!"))
            .catch(error => console.error(error));
        } else {
          currentData -= 1;
          set(photoLikesRef, currentData)
            .then(() => console.log("unliked!"))
            .catch(error => console.error(error));
        }
      })
  }
  return (
    <div className="flex-container general-layout">
      <header>
        <NavBar uid={uid}/>
      </header>
      <main>
        <Routes>
          <Route index path='/login' element={<Login />}></Route>
          <Route path='/discover'
            element={
              <ProtectedRoute user={user}>
                <Discover savePost={savePost} likePost={likePost} uid={uid} />
              </ProtectedRoute>
            }
          ><Route path='/discover/:postId'
            element={
              <ProtectedRoute user={user}>
                <OpenPost uid={uid} savePost={savePost} followRestaurant={followRestaurant} likePost={likePost} />
              </ProtectedRoute>
            }
          ></Route>
          </Route>
          <Route path='/eats'
            element={
              <ProtectedRoute user={user}>
                <Eats />
              </ProtectedRoute>
            }
          ></Route>
          <Route path='/saved'
            element={
              <ProtectedRoute user={user}>
                <Saved uid={uid} savePost={savePost} likePost={likePost}/>
              </ProtectedRoute>
            }
          ></Route>
          <Route path='/following'
            element={
              <ProtectedRoute user={user}>
                <Following uid={uid}/>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/:profileId" element={<Profile uid={uid} savePost={savePost} followRestaurant={followRestaurant} likePost={likePost}/> } />
          <Route path="*" element={<Navigate to="discover" />} />
        </Routes>
      </main>
      <footer>
        <FooterDetail />
      </footer>
    </div>
  )
}

export default App;
