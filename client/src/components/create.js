import React, {useState} from 'react';

function CreatePost(UploadImg, Descriptions) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [links, setLinks] = useState('');
    const [tags, setTags] = useState('');

    const handlePublish = () => {
        // Code for publish button
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
                        <label for="title">Title</label>
                        <textarea id="title" name="title" rows="2" value={title} onChange={(d) => setTitle(d.target.value)} placeholder="Add a title" required></textarea>
                    </div>
                    <div className="description-container">
                        <label for="description1">Description</label>
                        <textarea id="description" name="description" value={description} onChange={(d) => setDescription(d.target.value)} rows="2" placeholder="Add a caption" required></textarea>
                    </div>
                    <div className="description-container">
                        <label for="description1">Links</label>
                        <textarea id="description" name="description" value={links} rows="2" onChange={(d) => setLinks(d.target.value)} placeholder="Link restaurant" ></textarea>
                    </div>
                    <div className="description-container">
                        <label for="description1">Tags</label>
                        <textarea id="description" name="description" value={tags} rows="2" onChange={(d) => setTags(d.target.value)} placeholder="Add tags" ></textarea>
                        <br/>
                        <div className="publish-button">
                            <button className="NomNom-button" id="publish" onClick={handlePublish}>Publish</button>
                        </div>
                    </div>   
            </div>
        </form>
    </div> 
    );
    
}

export default CreatePost;
