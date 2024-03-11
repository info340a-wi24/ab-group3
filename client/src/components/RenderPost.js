'use strict';

import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

export function RenderPost(props) {
    let post = props.post;

    let src = post.src;
    let alt = post.alt;
    let restaurantId = post.restaurant_id;

    let db = getDatabase();
    let restaurantRef = ref(db, "restaurants/" + restaurantId);
    let restaurantName = "";
    onValue(restaurantRef, (snapshot) => { 
        restaurantName = snapshot.val().restaurant_name;
    })

    // let savePostCall = props.savePost(post.photo_id);

    return (
        <div className="flex-container post">
            <div className="flex-container post-interaction">
                <div>
                    <div className="bookmark" ></div>
                </div>
            </div>
            <Link to={"/discover/" + post.photo_id + alt} onClick={window.scrollTo(0, 0)} className="flex-container">
                <div className='post-img-background'>
                    <img src={src} alt={alt} />
                </div>
            </Link>
            <div className='flex-container restaurant-container'>
                <div className='flex-container restaurant-name'>
                    <p>{restaurantName}</p>
                </div>
                <div className="heart-container">
                    <img src={"./../img/heart.png"} className="icon heart" />
                    <img src={"./../img/heart-filled.png"} className="icon heart-filled" />
                </div>
            </div>
        </div>
    );
}