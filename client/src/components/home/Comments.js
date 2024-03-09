'use strict';

export function Comments(props) {
    let toggleComments = props.toggleComments;
    
    return (
        <div class="flex-container comment-box">
            <div>
                <button id="minimize-bar" onClick={toggleComments}></button>
            </div>
            <div class="flex-container comment-count">
                <p>7 comments</p>
                <button className="material-icons">
                    <div className="like-count">69</div> 
                    favorite
                </button>
            </div>
            <div className="comment-section">
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"./../img/Nikke.jpg"} alt="big mommy ThomasMommyMilkers" />
                    </div>
                    <div class="username">
                        <p>ThomasMommyMilkers</p>
                        <p>Mommy likes that!</p>
                    </div>
                </div>
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"./../img/nikocado.webp"} alt="water-weight mf" />
                    </div>
                    <div className="username">
                        <p>PhucPhiPhi</p>
                        <p>Da'me dane da'me yo da'me da'ne yo</p>
                    </div>
                </div>
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"./../img/nikocado.webp"} alt="water-weight mf" />
                    </div>
                    <div className="username">
                        <p>PhucPhiPhi</p>
                        <p>Da'me dane da'me yo da'me da'ne yo</p>
                    </div>
                </div>
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"./../img/nikocado.webp"} alt="water-weight mf" />
                    </div>
                    <div className="username">
                        <p>PhucPhiPhi</p>
                        <p>Da'me dane da'me yo da'me da'ne yo</p>
                    </div>
                </div>
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"./../img/nikocado.webp"} alt="water-weight mf" />
                    </div>
                    <div className="username">
                        <p>PhucPhiPhi</p>
                        <p>Da'me dane da'me yo da'me da'ne yo</p>
                    </div>
                </div>
                <div className="flex-container commenter">
                    <div className="profile-pic">
                        <img src={"./../img/nikocado.webp"} alt="water-weight mf" />
                    </div>
                    <div className="username">
                        <p>PhucPhiPhi</p>
                        <p>Da'me dane da'me yo da'me da'ne yo</p>
                    </div>
                </div>
            </div>
            <div className="flex-container comment-entry">
                <textarea type="text" id="add-a-comment" name="add-a-comment" placeholder=" Add a comment"
                    rows="1" aria-label="add-a-comment"></textarea>
                <div>
                    <button id="post-comment" class="NomNom-button">Post</button>
                </div>
            </div>
        </div>
    );
}