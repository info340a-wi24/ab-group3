'use strict';
import _ from 'lodash';

import { Link } from 'react-router-dom';

function createColumn(props) {
    let photoGallery = props.photoGallery.map((photo) => {
        photo = <img src={photo.src} />;
    })

    return (<div className="flex-container column-box">{photoGallery}</div>);
}

export function Discover(props) {
    let photoGallery = props.photoGallery;
    let columnArray = [];

    let screenSize = props.windowWidth;
    let numCol = 1;
    if (screenSize > 367) {
        numCol++;
    }
    if (screenSize > 663) {
        numCol++;
    }
    if (screenSize > 800) {
        numCol++;
    }
    if (screenSize > 1200) {
        numCol++;
    }
    if (screenSize > 1500) {
        numCol++;
    }

    if (numCol != 1) {
        columnArray = _.chunk(photoGallery, Math(photoGallery.length / numCol));
        for (let i = 0; i < numCol; i++) {
            let currentColumn = columnArray[numCol];
            let column = <createColumn photoGallery={currentColumn} />;
            columnArray.push(column);
        }
    } else {
        columnArray = <createColumn photoGallery={photoGallery} />;
    }

    return (
        <>
            <div className="flex-container home-option">
                <Link to="../discovery" id="chosen-option" class="NomNom-button">Discover</Link>
                <Link to="../following" className="NomNom-button">Following</Link>
                <Link to="../saved" className="NomNom-button">Saved</Link>
                <Link to="../recent" className="NomNom-button">Recent</Link>
            </div>
            <div className="flex-container post-list">
                <div className="flex-container column-box">
                    <div className="flex-container post">
                        <div className="flex-container post-interaction">
                            <div>
                                <div className="bookmark"></div>
                            </div>
                        </div>
                        <a href="openpost.html" className="flex-container">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" alt="hot sexy nikke girls" />
                        </a>
                        <div className="flex-container restaurant-name">
                            <p>Bob's burgers</p>
                            <div className="heart-container">
                                <img src="img/heart-filled.png" className="icon heart" />
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
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" alt="hot sexy nikke girls" />
                        </a>
                        <div className="flex-container restaurant-name">
                            <p>Bob's burgers</p>
                            <div className="heart-container">
                                <img src="img/heart-filled.png" className="icon heart" />
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
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" alt="hot sexy nikke girls" />
                        </a>
                        <div className="flex-container restaurant-name">
                            <p>Bob's burgers</p>
                            <div className="heart-container">
                                <img src="img/heart-filled.png" className="icon heart" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}