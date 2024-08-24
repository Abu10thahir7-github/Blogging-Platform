const express = require('express');
const {
    createPost,

} = require('../controllers/postControllers');

const router = express.Router();

// Create a new post    
router.post('/create', createPost);


module.exports = router;
