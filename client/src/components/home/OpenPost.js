'use strict';

import { Comments } from './Comments';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import _ from 'lodash';

export function OpenPost(props) {
    let postInfo = useParams().postId;
    let postId = postInfo.match(/^\d+/);

    let [post, setPost] = useState({});
    let [restaurants, setRestaurants] = useState([]);
    let [showComment, setShowComment] = useState(false);

    useEffect(() => {
        let db = getDatabase();
        let postRef = ref(db, "photos/"+postId);

        let unregisterFuntion = onValue(postRef, (snapshot) => {
            let postValue = snapshot.val();
            setPost(postValue);
        });

        function cleanup() {
            unregisterFuntion();
        }
        return cleanup;
    }, [postInfo])

    useEffect(() => {
        let db = getDatabase();
        let restaurantsRef = ref(db, "restaurants");

        let unregisterFuntion = onValue(restaurantsRef, (snapshot) => {
            let restaurantsValue = snapshot.val();
            let restaurantsKeys = Object.keys(restaurantsValue);

            let restaurantsArray = restaurantsKeys.map((key) => {
                let singleRestaurant = { ...restaurantsValue[key] };
                return singleRestaurant;
            })
            setRestaurants(restaurantsArray);
        });

        function cleanup() {
            unregisterFuntion();
        }
        return cleanup;
    }, [])

    function toggleComments() {
        showComment ? setShowComment(false) : setShowComment(true);
    }

    let src = post.src;
    let alt = post.alt;
    let restaurantName = post.restaurant_name;

    let restaurantPfp = "";
    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].restaurant_name == restaurantName) {
            restaurantPfp = restaurants[i].cover_pic;
            break;
        }
    }

    return (
        <>
            <div className="flex-container post-box">
                <div className="post-img">
                    <img src={src} alt={alt} />
                </div>
                <div className="flex-container post-detail">
                    <div className="flex-container post-creator">
                        <div className="profile-pic">
                            <img src={restaurantPfp} alt={restaurantName} />
                        </div>
                        <div className="username">
                            <p>{restaurantName}</p>
                            <p>999 followers</p>
                        </div>
                        <div className="follow-box">
                            <button className="NomNom-button">Follow</button>
                        </div>
                    </div>
                    <section>
                        <h1>{alt}</h1>
                        <p>
                            "Description of the post goes right here which would normally be stored in firebase!"
                        </p>
                    </section>
                    <div className="flex-container post-util">
                        <button className="material-icons">
                            favorite
                            <div className="like-count">69</div>
                        </button>
                        <div>
                            <button className="NomNom-button">Save</button>
                        </div>
                        <button className="material-icons" onClick={toggleComments}>
                            maps_ugc
                        </button>
                    </div>
                    <div className="flex-container comment-dropdown">
                        <p>7 Comments</p>
                        <button onClick={toggleComments}>
                            {showComment && <div className="material-icons" aria-label="expand less">expand_less</div>}
                            {!showComment && <div className="material-icons" aria-label="expand more">expand_more</div>}
                        </button>
                    </div>
                    {showComment && <Comments toggleComments={toggleComments}/>}
                </div>
            </div>
            <p>Similar posts</p>
        </>
    );
}