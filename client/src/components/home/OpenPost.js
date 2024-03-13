'use strict';

import { Comments } from './Comments';

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import _ from 'lodash';

export function OpenPost(props) {
    let postInfo = useParams().postId;
    let postId = postInfo.match(/^\d+/);

    let [post, setPost] = useState({});
    let [restaurant, setRestaurant] = useState({});
    let [isFollowing, setFollowing] = useState(false);
    let [isLiked, setLiked] = useState(false);
    let [isSaved, setSaved] = useState(false);
    let [showComment, setShowComment] = useState(false);

    useEffect(() => {
        let db = getDatabase();
        let postRef = ref(db, "photos/" + postId);

        let unregisterFuntion = onValue(postRef, (snapshot) => {
            let postValue = snapshot.val();
            setPost(postValue);
        });

        function cleanup() {
            unregisterFuntion();
        }
        return cleanup;
    }, [postInfo])

    let restaurantId = post.restaurant_id;

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
    }, [post])

    useEffect(() => {
        let db = getDatabase();
        let followRef = ref(db, "users/" + props.uid + "/following");

        let unregisterFunction = onValue(followRef, (snapshot) => {
            let followValue = snapshot.val();
            if (followValue != undefined) {
                let followArray = Object.keys(followValue);
                followArray.forEach((index) => {
                    if (index == restaurantId) {
                        setFollowing(true);
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
        let likedRef = ref(db, "users/" + props.uid + "/liked");

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

    useEffect(() => {
        let db = getDatabase();
        let savedRef = ref(db, "users/" + props.uid + "/saved");

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

    function toggleComments() {
        showComment ? setShowComment(false) : setShowComment(true);
    }

    let savePost = () => {
        setSaved(!isSaved);
        props.savePost(postId[0]);
    }

    let followRestaurant = () => {
        setFollowing(!isFollowing);
        props.followRestaurant(restaurantId);
    }

    let likePost = () => {
        setLiked(!isLiked);
        props.likePost(postId[0]);
    }

    let src = post.src;
    let alt = post.alt;
    let likes = post.likes;
    let restaurantName = "";
    let restaurantPfp = "";
    if (restaurant != null) {
        restaurantName = restaurant.restaurant_name;
        restaurantPfp = restaurant.cover_pic;
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
                            <Link to={"/" + restaurantId + " " + restaurantName}>
                                <img src={restaurantPfp} alt={restaurantName} />
                            </Link>
                        </div>
                        <div className="username">
                            <Link to={"/" + restaurantId + " " + restaurantName}>
                                <p>{restaurantName}</p>
                            </Link>
                            <p>999 followers</p>
                        </div>
                        <div className='follow-box'>
                            {!isFollowing && <button type="button" className="NomNom-button" onClick={followRestaurant}>Follow</button>}
                            {isFollowing && <button type="button" className="NomNom-button unfollow" onClick={followRestaurant}>Following</button>}
                        </div>
                    </div>
                    <section>
                        <h1>{alt}</h1>
                        <p>
                            Some description that should be stored on firebase for each unique post!
                        </p>
                    </section>
                    <div className="flex-container post-util">
                        <div className='flex-container like-box'>
                            <div className="heart-container-open-post" onClick={likePost}>
                                <img src="../../img/heart-black.png" className={`icon heart ${isLiked ? "liked" : null}`}/>
                                <img src={"../../img/heart-black-filled.png"} className={`icon heart-filled ${isLiked ? "liked" : "unliked"}`} />
                            </div>
                            <div className="like-count">{likes}</div>
                        </div>
                        {!isSaved && <button className="NomNom-button" onClick={savePost} >Save</button>}
                        {isSaved && <button className="NomNom-button unsaved" onClick={savePost} >Saved</button>}
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
                    {showComment && <Comments toggleComments={toggleComments} likes={likes}/>}
                </div>
            </div>
            <p>Similar posts</p>
        </>
    );
}