'use strict';

export function Comments(props) {
    let toggleComments = props.toggleComments;
    let likes = props.likes;
    
    return (
        <div className="flex-container comment-box">
            <div>
                <button id="minimize-bar" onClick={toggleComments}></button>
            </div>
            <div className="flex-container comment-count">
                <p>6 comments</p>
                <button className="material-icons">
                    <div className="like-count">{likes}</div> 
                    favorite
                </button>
            </div>
            <div className="comment-section">
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"https://www.gravatar.com/avatar/073e45f574ac3e4f134aba74dedb556c?s=128"} alt="big mommy ThomasMommyMilkers" />
                    </div>
                    <div className="username">
                        <p>Jacob'sTrauma</p>
                        <p>That's bussin!</p>
                    </div>
                </div>
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"https://canvas.uw.edu/courses/1697021/files/114494570/preview"} alt="water-weight mf" />
                    </div>
                    <div className="username">
                        <p>SenseiNathanChen</p>
                        <p>Keep cooking the good food :)</p>
                    </div>
                </div>
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"https://i.etsystatic.com/40540154/r/il/6f3e95/5056467595/il_570xN.5056467595_smcm.jpg"} alt="water-weight mf" />
                    </div>
                    <div className="username">
                        <p>BananaBanjo</p>
                        <p>大好きです</p>
                    </div>
                </div>
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"https://i.kym-cdn.com/entries/icons/original/000/046/701/Screenshot_(308).png"} alt="water-weight mf" />
                    </div>
                    <div className="username">
                        <p>PhucTheAnimeMan34</p>
                        <p>This dish should be in food wars</p>
                    </div>
                </div>
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"https://pbs.twimg.com/profile_images/1727576023892729856/eIUAw7kV_400x400.jpg"} alt="water-weight mf" />
                    </div>
                    <div className="username">
                        <p>ThiThiThiThi</p>
                        <p>uwu</p>
                    </div>
                </div>
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"./../img/nikocado.webp"} alt="water-weight mf" />
                    </div>
                    <div className="username">
                        <p>JahsBussinMeat</p>
                        <p>I see meat, I like pic.</p>
                    </div>
                </div>
            </div>
            <div className="flex-container comment-entry">
                <textarea type="text" id="add-a-comment" name="add-a-comment" placeholder=" Add a comment"
                    rows="1" aria-label="add-a-comment"></textarea>
                <div>
                    <button id="post-comment" className="NomNom-button">Post</button>
                </div>
            </div>
        </div>
    );
}