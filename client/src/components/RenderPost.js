'use strict';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get, onValue } from 'firebase/database';

export function RenderPost(props) {
    let uid = props.uid;
    let post = props.post;

    let src = post.src;
    let alt = post.alt;
    let restaurantId = post.restaurant_id;
    let postId = post.photo_id;
    
    let [restaurant, setRestaurant] = useState(" ");
    let [isSaved, setSaved] = useState(false);
    let [isLiked, setLiked] = useState(false);

    useEffect(() => {
        let db = getDatabase();
        let restaurantRef = ref(db, "restaurants/" + restaurantId);

        let unregisterFunction = onValue(restaurantRef, (snapshot) => { 
            let restaurantValue = snapshot.val();
            setRestaurant(restaurantValue);
        })

        function cleanup() {
            unregisterFunction();
        }

        return cleanup;
    }, [])

    useEffect(() => {
        let db = getDatabase();
        let savedRef = ref(db, "users/" + uid + "/saved");

        let unregisterFunction = onValue(savedRef, (snapshot) => {
            let savedValue = snapshot.val();
            if (savedValue != undefined) {
                let savedArray = Object.keys(savedValue);
                savedArray.forEach((index) => {
                    if (index == postId) {
                        setSaved(true);
                    }
                })
            }
        })

        function cleanup() {
            unregisterFunction();
        }

        return cleanup;
    }, [post]);

    useEffect(() => {
        let db = getDatabase();
        let likedRef = ref(db, "users/" + uid + "/liked");

        let unregisterFunction = onValue(likedRef, (snapshot) => {
            let likedValue = snapshot.val();
            if (likedValue != undefined) {
                let likedArray = Object.keys(likedValue);
                likedArray.forEach((index) => {
                    if (index == postId) {
                        setLiked(true);
                    }
                })
            }
        })

        function cleanup() {
            unregisterFunction();
        }

        return cleanup;
    }, [post]);

    let restaurantName = "";
    if (restaurant != null) {
        restaurantName = restaurant.restaurant_name;
    }

    let savePost = () => {
        setSaved(!isSaved);
        props.savePost(postId);
    }

    let likePost = () => {
        setLiked(!isLiked);
        props.likePost(postId);
    }

    let scrollTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="flex-container post" >
            <div className="flex-container post-interaction">
                <div>
                    <div className={isSaved ? "bookmark-toggled" : "bookmark"} onClick={savePost}></div>
                </div>
            </div>
            <Link to={"/discover/" + post.photo_id + restaurantName} onClick={scrollTop} className="flex-container">
                <img src={src} alt={alt} />  
            </Link>
            <div className='flex-container restaurant-container'>
                <div className='flex-container restaurant-name'>
                    <p>{restaurantName}</p>
                </div>
                <div className="heart-container" onClick={likePost}>
                    <img src={"./../img/heart.png"} className={`icon heart ${isLiked ? "liked" : "unliked"}`}/>
                    <img src={"./../img/heart-filled.png"} className={`icon heart-filled ${isLiked ? "liked" : "unliked"}`} />
                </div>
            </div>
        </div>
    );
}