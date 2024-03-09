'use strict';

export function NavBar(props) {
    return (
        <nav className="flex-container navbar">
            <section className="flex-container">

                <section className="dropdown">
                    <img className="more" src="img/more.png" alt="hamburger-dropdown-menu"></img>
                    <div className="flex-container dropdown-content">
                        <a href="explore.html">Explore</a>
                        <a href="create.html">Create</a>
                    </div>
                </section>

                <a href='index.html'>
                    <img className="active logo" src={"../../img/logo.jpg"} alt='logo'></img>
                </a>
                <div className="flex-container home-explore">
                    <a href="explore.html">Explore</a>
                    <a href="create">Create</a>
                </div>
            </section>
            <section className="flex-container">
                <div id="searchbar" className="flex-container">
                    <form method="get" action="">
                        <div className="search-fields">
                            <div className="search-term"><input type="text" placeholder="Search:" required></input></div>
                            <div className="search-term"><input type="text" placeholder="Location:"></input></div>
                            <div className="search-term" id="search-btn-cover">
                                <button className="search-btn" type="submit">
                                    <div id="search-btn-circle"></div>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <a className="user-profile" href="profile.html">
                    <img aria-label="user-profile" className="user-profile-img" src="img/nikocado.webp" alt="user-profile-img"></img>
                </a>
            </section>
        </nav>
    );
}