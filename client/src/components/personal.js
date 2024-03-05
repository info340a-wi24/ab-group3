'use strict';
import React, {useState} from 'react';

function ProfileInfo({name, profilePic}) {

    return (
        <div>
            <div>
            <img className="profileP" src={profilePic.url} alt="User's profile picture" height="200px" width="300px"/>
            </div> 
            <div className="profile">
                <p>@{name}</p>
            </div>
            <a href="personalP.html">
                <button className="postButton" type="button">Saved Post</button>
            </a>
        </div>
    );
}

function ProfileImgs({images}) {
    return (
    <div className="flex-containerP">
        {images.map((image, index) => (
         <div className="flex-itemP" key={index}>
            <img src={image.url} alt={image.alt}/>
         </div>
        
        ))}
        
    </div>
    );
}

export {ProfileInfo, ProfileImgs};