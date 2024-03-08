'use strict';
import _ from 'lodash';

import { Link } from 'react-router-dom';

export function Saved(props) {
    return (
        <>
            <div class="flex-container home-option">
                <Link to="../discover" class="NomNom-button">Discover</Link>
                <Link to="../following" class="NomNom-button">Following</Link>
                <Link to="../saved" id="chosen-option" class="NomNom-button">Saved</Link>
                <Link to="../recent" class="NomNom-button">Recent</Link>
            </div>
            <div className="flex-container post-list post-storage">
                <div className="flex-container post">
                    <div className="flex-container post-interaction">
                        <div>
                            <div className="bookmark"></div>
                        </div>
                    </div>
                    <a href="openpost.html" className="flex-container">
                        <img src="https://www.cnet.com/a/img/resize/69256d2623afcbaa911f08edc45fb2d3f6a8e172/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=675&width=1200" alt="hot sexy nikke girls" />
                    </a>
                    <div class="flex-container restaurant-name">
                        <p>Bob's burgers</p>
                        <div className="heart-container">
                            <img src="img/heart.png" class="icon heart" />
                            <img src={"img/heart-filled.png"} className="icon heart-filled" />
                        </div>
                    </div>
                </div>
                <div className="flex-container post">
                    <div className="flex-container post-interaction">
                        <div>
                            <div className="bookmark"></div>
                        </div>
                    </div>
                    <a href="openpost.html" className="flex-container">
                        <img src="https://www.cnet.com/a/img/resize/69256d2623afcbaa911f08edc45fb2d3f6a8e172/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=675&width=1200" alt="hot sexy nikke girls" />
                    </a>
                    <div class="flex-container restaurant-name">
                        <p>Bob's burgers</p>
                        <div className="heart-container">
                            <img src="img/heart.png" class="icon heart" />
                            <img src={"img/heart-filled.png"} className="icon heart-filled" />
                        </div>
                    </div>
                </div>
                <div className="flex-container post">
                    <div className="flex-container post-interaction">
                        <div>
                            <div className="bookmark"></div>
                        </div>
                    </div>
                    <a href="openpost.html" className="flex-container">
                        <img src="https://www.cnet.com/a/img/resize/69256d2623afcbaa911f08edc45fb2d3f6a8e172/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=675&width=1200" alt="hot sexy nikke girls" />
                    </a>
                    <div class="flex-container restaurant-name">
                        <p>Bob's burgers</p>
                        <div className="heart-container">
                            <img src="img/heart.png" class="icon heart" />
                            <img src={"img/heart-filled.png"} className="icon heart-filled" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}