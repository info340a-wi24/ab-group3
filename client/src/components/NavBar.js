'use strict';

export function navBar(props) {
    return (
        <nav class="flex-container navbar">
            <section class="flex-container">

                <section class="dropdown">
                    <img class="more" src="img/more.png" alt="hamburger-dropdown-menu"></img>
                    <div class="flex-container dropdown-content">
                        <a href="explore.html">Explore</a>
                        <a href="create.html">Create</a>
                    </div>
                </section>

                <a href='index.html'>
                    <img class="active logo" src='img/logo.jpg' alt='logo'></img>
                </a>
                <div class="flex-container home-explore">
                    <a href="explore.html">Explore</a>
                    <a href="create">Create</a>
                </div>
            </section>
            <section class="flex-container">
                <div id="searchbar" class="flex-container">
                    <form method="get" action="">
                        <div class="search-fields">
                            <div class="search-term"><input type="text" placeholder="Search:" required></input></div>
                            <div class="search-term"><input type="text" placeholder="Location:"></input></div>
                            <div class="search-term" id="search-btn-cover">
                                <button class="search-btn" type="submit">
                                    <div id="search-btn-circle"></div>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <a class="user-profile" href="profile.html">
                    <img aria-label="user-profile" class="user-profile-img" src="img/nikocado.webp" alt="user-profile-img"></img>
                </a>
            </section>
        </nav>
    );
}