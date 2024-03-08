'use strict';
import _ from 'lodash';

import { Link } from 'react-router-dom';

export function Recent(props) {
    return(
        <>
            <div className="flex-container home-option">
                <Link to="../discover" className="NomNom-button">Discover</Link>
                <Link to="../following" className="NomNom-button">Following</Link>
                <Link to="../saved" className="NomNom-button">Saved</Link>
                <Link to="../recent" id="chosen-option" className="NomNom-button">Recent</Link>
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
                    <div className="flex-container restaurant-name">
                        <p>Bob's burgers</p>
                        <div className="heart-container">
                            <img src="img/heart.png" className="icon heart" />
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
                    <div className="flex-container restaurant-name">
                        <p>Bob's burgers</p>
                        <div className="heart-container">
                            <img src="img/heart.png" className="icon heart" />
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
                    <div className="flex-container restaurant-name">
                        <p>Bob's burgers</p>
                        <div className="heart-container">
                            <img src="img/heart.png" className="icon heart" />
                            <img src={"img/heart-filled.png"} className="icon heart-filled" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}