'use strict';
import React, {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore'; 

function CreatePost(UploadImg, Descriptions) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [links, setLinks] = useState('');
    const [tags, setTags] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [file, setFile] = useState(null);

    const handleTagInputChange = (event) => {
        setTagInput(event.target.value);
    };

    const handleTagInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newTag = tagInput.trim();
            if(newTag !== '' && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setTagInput('');
            }
        }
    }

    const handlePublish = () => {

        //check if title and description are not empty
        if (!title.trim() || !description.trim()) {
            alert('Title and description are required');
            return;
        }


       const db = firebase.firestore();

        db.collection('post').add ({
            title: title,
            description: description,
            links: links,
            tags:  tags
        })

        .then((docRef) => {
            console.log('Document writen with ID: ', docRef.id);

            setTitle('');
            setDescription('');
            setLinks('');
            setTags([]);
            setTagInput('');
        })

        .catch((error) => {
            console.error('Error adding document: ', error);
            alert('An error occured while publishing the post. Please try again later.')
        });

        console.log('Publishing post...');
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files[0];
        setFile(droppedFiles);
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }

    const handleFileInputClick = () => {
        document.getElementById('fileInput').value = '';
    };

   


    return (
        <div className="flex-container upload-box">
        <div className="form-container">
            <div className="drop-area" id="dropArea" onDrop={handleDrop} onDrag={(event) => event.preventDefault()} onClick={handleFileInputClick}>
                <h3>Drag & Drop Files Here</h3>
                <p>or</p>
                <label for="fileInput" className="button">Click to Select Files</label>
                <br/>
                <br/>
                <input type="file" id="fileInput" multiple accept="image/*"  onChange={handleFileInputChange} style={{display: 'none'}} required/>
            </div>
        </div>
        <form className="container2">
            <div >
                    <div className="description-container">
                        <label htmlFor="title">Title</label>
                        <textarea id="title" name="title" rows="2" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a title" ></textarea>
                    </div>
                    <div className="description-container">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)} rows="2" placeholder="Add a caption" ></textarea>
                    </div>
                    <div className="description-container">
                        <label htmlFor="links">Links</label>
                        <textarea id="links" name="links" value={links} rows="2" onChange={(event) => setLinks(event.target.value)} placeholder="Enter Restaurant Links"  type="url" pattern="https?://.+"></textarea>
                    </div>
                    <div className="description-container">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" id="tagInput" value={tagInput} onChange={handleTagInputChange} onKeyDown={handleTagInputKeyDown} placeholder="Add tags"/>
                        <div id="tagContainer">
                            {tags.map((tag, index) => (
                                <span key={index} className='tag'>{tag}</span>
                            ))}
                        </div>
                        <br/>
                        <div className="publish-button">
                            <button className="NomNom-button" id="publish" onClick={handlePublish} disabled={!file}>Publish</button>
                        </div>
                    </div>   
            </div>
        </form>
    </div> 
    );
    


}

    
export default CreatePost;
