'use strict';

import { Link } from 'react-router-dom';

export function NavBar(props) {
    return (
        <nav class="flex-container navbar">
                <section class="flex-container">
                    <Link to="discover">
                        <img class="active logo" src='img/logo.jpg' alt='logo' />
                    </Link>
                    <div class="flex-container home-explore">
                        <Link to="create" class="NomNom-button">Create</Link>
                    </div>
                </section>
                <section class="flex-container">
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
                    <Link class="user-profile" href="profile.html">
                        <img aria-label="user-profile" class="user-profile-img" src="img/nikocado.webp" alt="user-profile-img" />
                    </Link>
                </section>
            </nav>
    );
}