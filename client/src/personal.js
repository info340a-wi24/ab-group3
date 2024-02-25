import React, {useState} from 'react';

function ProfileInfo() {

    return (
        <div>
            <div>
            <img className="profileP" src="img/Untitled_Artwork 15.PNG" alt="Users profile picture" height="200px" width="300px"/>
            </div> 
            <div className="profile">
                <p>@User_name</p>
            </div>
            <a href="personalP.html">
                <button className="postButton" type="button">Saved Post</button>
            </a>
        </div>
    );
}

function ProfileImgs() {
    return (
    <div className="flex-containerP">
        <div className="flex-itemP">
            
        </div>
        <div className="flex-itemP">
            
        </div>
        <div className="flex-itemP">
            
        </div>
        <div className="flex-itemP">
            
        </div>
        <div className="flex-itemP">
            
        </div>
        <div className="flex-itemP">
            
        </div>
        <div className="flex-itemP">
            
        </div>
        <div className="flex-itemP">
            
        </div>
        <div className="flex-itemP">
            
        </div>
        <div className="flex-itemP">
            
        </div>
        <div className="flex-itemP">
            
        </div> 
    </div>
    );
}

export {ProfileInfo, ProfileImgs};