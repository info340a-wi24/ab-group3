'use strict';

import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../index";

export function NavBar(props) {
    const handleSignOut = () => {
        signOut(auth)
          .then(() => console.log("Sign Out"))
          .catch((error) => console.log(error));
      };
    return (
        <nav className="flex-container navbar">
                <section className="flex-container">
                    <Link to="discover">
                        <img className="active logo" src={"./../img/logo.jpg"} alt='logo' />
                    </Link>
                    <div className="flex-container home-explore">
                        <Link to="create" className="NomNom-button">Create</Link>
                    </div>
                </section>
                <section className="flex-container">
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
                    <Link className="user-profile" href="profile.html">
                        <img aria-label="user-profile" className="user-profile-img" src={"./../img/nikocado.webp"} alt="user-profile-img" />
                    </Link>
                    <button onClick={handleSignOut}>Sign Out</button>

                </section>
            </nav>
    );
}