'use strict';
import _ from 'lodash';

import { Link } from 'react-router-dom';

export function Following(props) {
    return (
        <>
            <div class="flex-container home-option">
                <Link to="../discover" class="NomNom-button">Discover</Link>
                <Link to="../following" id="chosen-option" class="NomNom-button">Following</Link>
                <Link to="../saved" class="NomNom-button">Saved</Link>
                <Link to="../recent" class="NomNom-button">Recent</Link>
            </div>
            <div class="flex-container post-list restaurant-list">
                <figure class="restaurant-figure">
                    <a href="profile.html">
                        <img src={"https://i0.wp.com/www.drdavidludwig.com/wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg?w=800&ssl=1"} alt="hot sexy nikke girls" />
                        <figcaption>Jah's Big Meat BBQ</figcaption>
                    </a>
                </figure>
                <figure class="restaurant-figure">
                    <a href="profile.html">
                        <img src={"https://i0.wp.com/www.drdavidludwig.com/wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg?w=800&ssl=1"} alt="hot sexy nikke girls" />
                        <figcaption>Jah's Big Meat BBQ</figcaption>
                    </a>
                </figure>
                <figure class="restaurant-figure">
                    <a href="profile.html">
                        <img src={"https://i0.wp.com/www.drdavidludwig.com/wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg?w=800&ssl=1"} alt="hot sexy nikke girls" />
                        <figcaption>Jah's Big Meat BBQ</figcaption>
                    </a>
                </figure>
            </div>
        </>
    );
}