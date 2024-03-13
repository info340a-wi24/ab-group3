'use strict';

import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../../index";
import { useState, useEffect } from 'react';
import { get, ref, getDatabase } from 'firebase/database';

export function NavBar(props) {
    let [pfp, setPfp] = useState("./../img/user-default.webp");

    const handleSignOut = () => {
        signOut(auth)
            .then(() => console.log("Sign Out"))
            .catch((error) => console.log(error));
        
        setPfp("./../img/user-default.webp");
    };

    useEffect(() => {
        let db = getDatabase();
        let pfpRef = ref(db, "users/" + props.uid + "/pfp");
        get(pfpRef)
            .then((snapshot) => {
                let pfpValue = snapshot.val();
                if (pfpValue != "") {
                    setPfp(pfpValue);
                }
            })
            .catch(
                error => console.error("Failed to fetch profile picture: ", error)
            );
    }, [props.uid])
    let isAuth = false;
    if (auth.currentUser) {
        isAuth = true;
    }
    return (
        <nav className={`flex-container navbar ${isAuth ? null : "hidden"}`}>
            <section className="flex-container">
                <Link to="discover">
                    <img className="logo" src={"./../img/logo.jpg"} alt='logo' />
                </Link>
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
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                </div>
            </section>
        </nav>
    );
}