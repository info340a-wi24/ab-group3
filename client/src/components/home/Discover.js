'use strict';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';


import _ from 'lodash';

import { RenderPost } from '../RenderPost';

// function savePost(postId) {
//     let db = getDatabase();
//     let savedRef = ref(db, "users/1/saved");

//     let savedSize = 0;
//     onValue(savedRef, (snapshot) => {
//         let savedValue = snapshot.val();
//         if (savedValue != null) {
//             savedSize = Object.keys(savedValue).length + 1;
//         }
//     });

//     let addToSaveRef = ref(db, 1);

//     firebaseSet(addToSaveRef, postId)
//         .then(() => console.log("The saved directory now has a size of " + savedSize))
//         .catch(err => console.log(err));
// }


function useWindowWidth() {
    let [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        function updateWidth() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);
    return width;
}

function CreateColumn(props) {
    let postsArray = props.postsArray;

    let index = 0;
    let postsColumn = [];
    postsArray.forEach((post) => {
        postsColumn.push(<RenderPost key={index} post={{...postsArray[index]}}  /*savePost={savePost} */ />); 
        index++;
    })
    
    return (
        <div className="flex-container column-box">
            {postsColumn}
        </div>
    );
}

export function Discover(props) {
    let [photos, setPhotos] = useState([]);

    useEffect(() => {
        let db = getDatabase();
        let photosRef = ref(db, "photos");

        let unregisterFunction = onValue(photosRef, (snapshot) => {
            let photosValue = snapshot.val();
            let photosKeys = Object.keys(photosValue);

            let photosArray = photosKeys.map((key) => {
                let singlePhoto = {...photosValue[key]};
                return singlePhoto;
            })
            setPhotos(photosArray);
        });

        function cleanup() {
            unregisterFunction();
        }
        return cleanup;
    }, [])

    let screenWidth = useWindowWidth();
    let numCol = 1;
    if (screenWidth > 591) {
        numCol++;
    }
    if (screenWidth > 879) {
        numCol++;
    }
    if (screenWidth > 1167) {
        numCol++;
    }
    if (screenWidth > 1455) {
        numCol++;
    }
    if (screenWidth > 1743) {
        numCol++;
    }

    let dynamicColumns = [];

    if (numCol == 1) {
        dynamicColumns = <CreateColumn postsArray={photos} />
    } else {
        let arrayColumns = _.chunk(photos, photos.length / numCol);
        for (let i = 0; i < numCol; i++) {
            if (arrayColumns[i] != undefined) {
                dynamicColumns.push(<CreateColumn key={i} postsArray={[...arrayColumns[i]]} />);
            }
        }
    }

    let currentRoute = useLocation();
    let currentPath = currentRoute.pathname;

    if (currentPath != "/discover") {
        return (
            <>
                <Outlet />
                <div className="flex-container post-list">
                    {dynamicColumns} 
                </div>
            </>
        );
    }

    return (
        <>
                       
            <div className="flex-container home-option">
                <Link to="../discover" id="chosen-option" className="NomNom-button">Discover</Link>
                <Link to="../eats" className="NomNom-button">Eats</Link>
                <Link to="../saved" className="NomNom-button">Saved</Link>
                <Link to="../following" className="NomNom-button">Following</Link>
            </div>
            <div className="flex-container post-list">
                {dynamicColumns} 
            </div>
        </>
    );
}