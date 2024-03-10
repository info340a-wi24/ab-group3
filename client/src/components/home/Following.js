'use strict';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import { RenderPost } from '../RenderPost';

export function Following(props) {
    let [photos, setPhotos] = useState([]);

    useEffect(() => {
        let db = getDatabase();
        let photosRef = ref(db, "photos");

        let unregisterFuntion = onValue(photosRef, (snapshot) => {
            let photosValue = snapshot.val();
            let photosKeys = Object.keys(photosValue);

            let photosArray = photosKeys.map((key) => {
                let singlePhoto = { ...photosValue[key] };
                return singlePhoto;
            })
            setPhotos(photosArray);
        });

        function cleanup() {
            unregisterFuntion();
        }
        return cleanup;
    }, [])

    let recentArray = [];
    for (let i = 0; i < photos.length; i++) {
        recentArray.push(<RenderPost post={{...photos[i]}} />);
    }

    return (
        <>
            <div className="flex-container home-option">
                <Link to="../discover" className="NomNom-button">Discover</Link>
                <Link to="../restaurants" className="NomNom-button">Eats</Link>
                <Link to="../saved" className="NomNom-button">Saved</Link>
                <Link to="../following" id="chosen-option" className="NomNom-button">Following</Link>
            </div>
            <div className="flex-container post-list post-storage">
                {recentArray}
            </div>
        </>
    );
}