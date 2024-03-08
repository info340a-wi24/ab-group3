'use strict';
import _ from 'lodash';

import { Link } from 'react-router-dom';

export function Following(props) {
    return (
        <>
            <div className="flex-container home-option">
                <Link to="../discover" className="NomNom-button">Discover</Link>
                <Link to="../following" id="chosen-option" className="NomNom-button">Following</Link>
                <Link to="../saved" className="NomNom-button">Saved</Link>
                <Link to="../recent" className="NomNom-button">Recent</Link>
            </div>
            <div className="flex-container post-list restaurant-list">
                <figure className="restaurant-figure">
                    <a href="profile.html">
                        <img src={"https://i0.wp.com/www.drdavidludwig.com/wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg?w=800&ssl=1"} alt="hot sexy nikke girls" />
                        <figcaption>Jah's Big Meat BBQ</figcaption>
                    </a>
                </figure>
                <figure className="restaurant-figure">
                    <a href="profile.html">
                        <img src={"https://i0.wp.com/www.drdavidludwig.com/wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg?w=800&ssl=1"} alt="hot sexy nikke girls" />
                        <figcaption>Jah's Big Meat BBQ</figcaption>
                    </a>
                </figure>
                <figure className="restaurant-figure">
                    <a href="profile.html">
                        <img src={"https://i0.wp.com/www.drdavidludwig.com/wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg?w=800&ssl=1"} alt="hot sexy nikke girls" />
                        <figcaption>Jah's Big Meat BBQ</figcaption>
                    </a>
                </figure>
            </div>
        </>
    );
}