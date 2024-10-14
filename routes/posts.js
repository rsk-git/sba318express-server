import { Router } from "express";
import { posts } from "../data/posts.js";

const postsRouter = Router();

/**
 * GET /api/posts
 * Retrieves all posts
 */
postsRouter.get('/', (req, res) => {
    res.json(posts);
});

/**
 * GET /api/posts/:id
 * Retrieves a specific post by id
 */
postsRouter.get('/:id', (req, res, next) => {
    const post = posts.find((post) => post.id == req.params.id);
    
    if (post) {
        res.json(posts);
    } else {
        next(); // calls the custom middleware for 404
    }
});

/**
 * POST - Create a new post
 */
postsRouter.post('/', (req, res) => {
    const newPost = { id: posts.length + 1, ...req.body };
    posts.push(newPost);
    res.status(201).json(newPost);
});

/**
 * PATCH - Update a post
 */
postsRouter.patch("/:id", async(req, res) => {
    const id = parseInt(req.params.id); 
console.log(`Updating post with id: ${id}`);
console.log(`Request body:`, req.body);


    const postIndex = posts.findIndex((post) => post.id === id); // Find the index of the post

    console.log(`Updating the post with id: ${id}`);
    console.log(`Request body:`, req.body);

    // Check if the post exists
    if (postIndex !== -1) {
        // Update the post 
        Object.assign(posts[postIndex], req.body);
        return res.status(200).json(posts[postIndex]); // Return the post
    } else {
        return res.status(404).json({ error: "Post not found" }); // Post not found
    }
});



/**
 * DELETE a post by id
 */
postsRouter.delete("/:id", (req, res, next) => {
    const postIndex = posts.findInde((u, i) => {
        if (postIndex === -1) {
           return next(error("Post not found"));
        }
        const deletepost = posts.splice(postIndex, 1)[0];
    });

});

export default postsRouter;
