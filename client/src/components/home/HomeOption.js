'use strict';
import { Link } from "react-router-dom";

export function HomeOption(props) {
    return (
        <div class="flex-container home-option">
            <Link id="chosen-option" class="NomNom-button" to="discovery">Discover</Link>
            <Link to="following" class="NomNom-button">Following</Link>
            <Link to="saved" class="NomNom-button">Saved</Link>
            <Link to="recent" class="NomNom-button">Recent</Link>
        </div>
    );
}