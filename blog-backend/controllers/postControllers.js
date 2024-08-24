const Post = require('../models/PostModels');

// Create a new post
const createPost = async (req, res) => {
 // Assuming the user ID is stored in the token and extracted by the middleware
    const { title, content ,userId} = req.body;
    try {
        const newPost = new Post({
            title,
            content,
            author: userId,
        });

        await newPost.save();

        res.status(201).json({ status: "success", post: newPost });
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};
module.exports ={createPost}