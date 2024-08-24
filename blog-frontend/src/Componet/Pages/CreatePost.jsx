import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("current");  // Assuming the JWT token is stored in localStorage

        axios.post("http://localhost:5000/api/posts/create", { title, content,userId }, {

        })
        .then((res) => {
            console.log(res.data);
            navigate("/posts");  // Redirect to a page showing the list of posts
        })
        .catch((err) => {  
            console.log(err);
            setError("An error occurred while creating the post. Please try again later.");
        });
    };

    return (
        <div className="create-post">
            <h2>Create a New Post</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Title"
                        required
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        placeholder="Content"
                        required
                        className="form-control"
                        rows="10"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Post
                </button>
            </form>
        </div>
    );
}

export default CreatePost;
