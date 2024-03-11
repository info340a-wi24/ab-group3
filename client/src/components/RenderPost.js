'use strict';

import { Link } from 'react-router-dom';

export function RenderPost(props) {
    let post = props.post;

    let src = post.src;
    let alt = post.alt;
    let restaurantName = post.restaurant_name;

    return (
        <div className="flex-container post">
            <div className="flex-container post-interaction">
                <div>
                    <div className="bookmark"></div>
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