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

    function toggleComments() {
        showComment ? setShowComment(false) : setShowComment(true);
    }

    let src = post.src;
    let alt = post.alt;
    let restaurantId = post.restaurant_id;
    
    let db = getDatabase();
    let restaurantNameRef = ref(db, "restaurants/" + restaurantId + "/restaurant_name");
    let restaurantPfpRef = ref(db, "restaurants/" + restaurantId + "/cover_pic");
    
    let restaurantName = "";
    let restaurantPfp = ""
    onValue(restaurantNameRef, (snapshot) => { 
        restaurantName = snapshot.val();
    })

    onValue(restaurantPfpRef, (snapshot) => {
        restaurantPfp = snapshot.val();
    })

    return (
        <>
            <div className="flex-container post-box">
                <div className="post-img">
                    <img src={src} alt={alt} />
                </div>
                <div className="flex-container post-detail">
                    <div className="flex-container post-creator">
                        <div className="profile-pic">
                            <Link to={"/" + restaurantName}>
                                <img src={restaurantPfp} alt={restaurantName} />
                            </Link>
                        </div>
                        <div className="username">
                            <Link to={"/" + restaurantName}>
                                <p>{restaurantName}</p>
                            </Link>
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
                    {showComment && <Comments toggleComments={toggleComments} />}
                </div>
            </div>
            <p>Similar posts</p>
        </>
    );
}