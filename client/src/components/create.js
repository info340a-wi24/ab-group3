'use strict';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import { firebaseConfig } from './Config.js';


function CreatePost(UploadImg, Descriptions) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [links, setLinks] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [authInitialized, setAuthInitialized] = useState(false);
    const [imageAddress, setImageAddress] = useState('');
    const [imageUrl, setImageUrl] = useState('');


    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        firebase.auth().onAuthStateChanged(user => {
            setAuthInitialized(true);
        });

        const db = getDatabase();
        const postsRef = ref(db, 'photos');
        let lastestPhotoId = 112;
        onValue(postsRef, (snapshot) => {
            const posts = snapshot.val();
            
            
            if (posts) {
                Object.values(posts).forEach((post) => {
                    if (post.photo_id && parseInt(post.photo_id) > lastestPhotoId) {
                        lastestPhotoId = parseInt(post.photo_id);
                    }
                })
            }
        })
        
        const newPhotoId = lastestPhotoId + 1;

        

       
    }, []);

    const handleTagInputChange = (event) => {
        setTagInput(event.target.value);
    };

    const handleTagInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newTag = tagInput.trim();
            if (newTag !== '' && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setTagInput('');
            }
        }
    }

    const handleFileInputChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            setFile(files[0]);
            const fileUrl = URL.createObjectURL(files[0]); 
            setImageAddress(fileUrl); 
            setImageUrl(fileUrl); 
        }

    };

    const handlePublish = () => {
        console.log('Publish button clicked');
        

        if (!authInitialized) {
            // Handle case where authentication is not initialized
            setErrorMessage('Authentication is not initialized.');
            return;
        }

        const user = firebase.auth().currentUser;
        if (!user) {
            setErrorMessage('Please login before publishing the post.');
            return;
        }

        if (!file) {
            setErrorMessage('Please select an image to upload.');
            return;
        }

        
        const db = getDatabase(); 

        const postsRef = ref(db, 'photos'); 
        let lastestPhotoId = 112;
        onValue(postsRef, (snapshot) => {
            const posts = snapshot.val();
            
            if (posts) {
                Object.values(posts).forEach((post) => {
                    if (post.photo_id && parseInt(post.photo_id) > lastestPhotoId) {
                        lastestPhotoId = parseInt(post.photo_id);
                    }
                })
            }
        })
        
        const newPhotoId = lastestPhotoId + 1;

        

        const restaurantRef = ref(db, 'restaurants');
        let restaurantId = null;
        
        onValue(restaurantRef, (snapshot) => {
            const restaurants = snapshot.val();

            if (restaurants) {
                Object.values(restaurants).forEach((restaurant)  => {
                if (restaurant.website && links.includes(restaurant.website)) {
                    restaurantId = restaurant.restaurant_id;
                }
            });
        }
        })
    

        const newPostRef = push(postsRef); 

        const postData = {
            alt:description,
            photo_id: newPhotoId,
            restaurant_id: restaurantId,
            src: imageUrl
        };

        set(newPostRef, postData) 
            .then(() => {
                console.log('Post published successfully');
                setTitle('');
                setDescription('');
                setImageAddress('');
                setImageUrl('');
                setLinks('');
                setTags([]);
                setTagInput('');
                setFile(null);
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
                alert('An error occurred while publishing the post. Please try again later.')
            });

        console.log('Publishing post...');
    };





    return (
        <div className="flex-container upload-box">
            <div className="form-container">
                <div className="drop-area" id="dropArea">
                    <h3>Drag & Drop Files Here</h3>
                    <p>or</p>
                    <label htmlFor="fileInput" className="button">Click to Select Files</label>
                    <br />
                    <br />
                    <input type="file" id="fileInput" onChange={handleFileInputChange} multiple accept="image/*" required />
                </div>
            </div>
            <form className="container2">
                <div>
                    <div className="description-container">
                        <label htmlFor="title">Title</label>
                        <textarea id="title" name="title" rows="2" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a title" required></textarea>
                    </div>
                    <div className="description-container">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)} rows="2" placeholder="Add a caption" required></textarea>
                    </div>
                    <div className="description-container">
                        <label htmlFor="links">Links</label>
                        <textarea id="links" name="links" value={links} rows="2" onChange={(event) => setLinks(event.target.value)} placeholder="Enter Restaurant Links" type="url" pattern="https?://.+"></textarea>
                    </div>
                    <div className="description-container">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" id="tagInput" value={tagInput} onChange={handleTagInputChange} onKeyDown={handleTagInputKeyDown} placeholder="Add tags " />
                        <div id="tagContainer">
                            {tags.map((tag, index) => (
                                <span key={index} className='tag'>{tag}{index !== tags.length - 1 && ' '}</span>
                            ))}
                        </div>
                        <br />
                        <div className="publish-button">
                            <button className="NomNom-button" id="publish" onClick={handlePublish} disabled={!file}>Publish</button>
                        </div>
                        {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    </div>
                </div>
            </form>
        </div>
    );

}

export { CreatePost };
