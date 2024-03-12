'use strict';

import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../index";
import { useState, useEffect } from 'react';
import { get, ref, getDatabase } from 'firebase/database';

export function NavBar(props) {
    const handleSignOut = () => {
        signOut(auth)
          .then(() => console.log("Sign Out"))
          .catch((error) => console.log(error));
      };

    let [pfp, setPfp] = useState("./../img/logo.jpg")
    useEffect(() => {
        let db = getDatabase();
        let pfpRef = ref(db, "users/" + props.uid + "/pfp");
        get(pfpRef)
        .then((snapshot) => {
            let pfpValue = snapshot.val();
            setPfp(pfpValue);
        })
        .catch(
            error => console.error("Failed to fetch profile picture: ", error)
        );
    })
    return (
        <nav className="flex-container navbar">
                <section className="flex-container">
                    <Link to="discover">
                        <img className="active logo" src={"./../img/logo.jpg"} alt='logo' />
                    </Link>
                    <div className="flex-container home-explore">
                        <Link to="create">Create</Link>
                    </div>
                </section>
                <section className="flex-container">
                    <div id="searchbar" className="flex-container">
                        <form method="get" action="">
                            <div className="search-fields">
                                <div className="search-term"><input type="text" placeholder="Search:" required /></div>
                                <div className="search-term" id="search-btn-cover">
                                    <button className="search-btn" type="submit">
                                        <div id="search-btn-circle"></div>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='dropdown'>
                        <Link className="user-profile" href="profile.html">
                            <img aria-label="user-profile" className="user-profile-img" src={pfp} alt="user-profile-img" />
                        </Link>
                        <div className='dropdown-content'>
                            <Link className="user-profile" href="profile.html">Settings</Link>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>
                </section>
            </nav>
    );
}