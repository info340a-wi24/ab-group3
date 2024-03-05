'use strict';
import React, {useState} from 'react';

function CreatePost(UploadImg, Descriptions) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [links, setLinks] = useState('');
    const [tags, setTags] = useState('');
    const [tagInput, setTagInput] = useState('');

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
        // Code for publish button
        const postData = {
            title: title,
            description: description,
            links: links,
            tags: tags.split(',').map(tag => tag.trim())
        }

        
    };

    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        
        console.log('Post published successfully:', response);
    })
    .catch(error => {
       
        console.error('Error publishing post:', error);
    });

 
};


    return (
        <div className="flex-container upload-box">
        <div className="form-container">
            <div className="drop-area" id="dropArea">
                <h3>Drag & Drop Files Here</h3>
                <p>or</p>
                <label for="fileInput" className="button">Click to Select Files</label>
                <br/>
                <br/>
                <input type="file" id="fileInput" multiple accept="image/*" required/>
            </div>
        </div>
        <form className="container2">
            <div >
                    <div className="description-container">
                        <label htmlFor="title">Title</label>
                        <textarea id="title" name="title" rows="2" value={title} onChange={(d) => setTitle(d.target.value)} placeholder="Add a title" required></textarea>
                    </div>
                    <div className="description-container">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={description} onChange={(d) => setDescription(d.target.value)} rows="2" placeholder="Add a caption" required></textarea>
                    </div>
                    <div className="description-container">
                        <label htmlFor="links">Links</label>
                        <textarea id="description" name="description" value={links} rows="2" onChange={(d) => setLinks(d.target.value)} placeholder="Link restaurant" ></textarea>
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
                            <button className="NomNom-button" id="publish" onClick={handlePublish}>Publish</button>
                        </div>
                    </div>   
            </div>
        </form>
    </div> 
    );
    


export default CreatePost;
