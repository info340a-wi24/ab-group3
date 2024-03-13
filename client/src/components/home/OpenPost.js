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

    function toggleComments() {
        showComment ? setShowComment(false) : setShowComment(true);
    }

    let savePost = () => {
        props.savePost(postId[0]);
    }

    let followRestaurant = () => {
        props.followRestaurant(restaurantId);
    }

    let likePost = () => {
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
                        <button className="NomNom-button" onClick={followRestaurant}>Follow</button>
                    </div>
                    <section>
                        <h1>{alt}</h1>
                        <p>
                            Some description that should be stored on firebase for each unique post!
                        </p>
                    </section>
                    <div className="flex-container post-util">
                        <button className="material-icons" onClick={likePost}>
                            favorite
                            <div className="like-count">{likes}</div>
                        </button>
                        <button className="NomNom-button" onClick={savePost} >Save</button>
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