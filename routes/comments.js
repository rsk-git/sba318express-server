import { Router } from "express";
import comments from '../data/comments.js';
import { users } from "../data/users.js";
import { posts } from "../data/posts.js";

import { error } from '../utils/error.js';

const commentsRouter = Router();

/**
 * GET/comments
 */
commentsRouter.get ('/', (req,res) => {
  res.json(comments);
   
});

/**
 * GET /comments/:id
Retrieves the comment with the specified id
 */

// GET id
commentsRouter.get('/:id', (req,res, next )=> {
    console.log(req.params);
    const comment = comments.find ((comment) => comment.id == req.params.id);

    if (comment){
        res.json(comment);
    }else {
        next();// calls the custom 404 middleware
    }
    
});

/**
 * PATCH /comments/:id
Used to update a comment with the specified id with a new body.
 */

commentsRouter.patch("/:id", (req, res, next) => {
    console.log(req.params);
  
    const comment = comments.find((c, i) => {
      if (c.id == req.params.id) {
        for (const key in req.body) {
          comments[i][key] = req.body[key];
        }
        return true;
      }
    });
  
    if (comment) res.json(comment);
    else next();
  });

  /**
   * DELETE /comments/:id
Used to delete a comment with the specified id.
   */

commentsRouter.delete("/:id", (req, res, next) => {
    console.log(req.params);
  
    const comment = comments.find((u, i) => {
      if (u.id == req.params.id) {
        comments.splice(i, 1);
        return true;
      }
    });
  
    if (comment) res.json(post);
    else next();
  });

  /**
   * GET /comments?userId=<VALUE>
Retrieves comments by the user with the specified userId.
   */

commentsRouter.get('/', (req,res,next) => {
    const userId = req.query.userId;

  if (!userId){
    return res.status(400).json({error: "userId required"});
  }
  const userComments = comments.filter(comment => comment.userId == userId);
  if (userComments.length >0){
    res.json(userComments);
  }else {
    next();
  }
})

/**
 * GET /comments?postId=<VALUE>
Retrieves comments made on the post with the specified postId.
 */

commentsRouter.get('/', (req,res,next) => {
    const postId = req.query.postId;

  if (!postId){
    return res.status(400).json({error: "postId required"});
  }
  const postComments = comments.filter(comment => comment.postId == postId);
  if (postComments.length >0){
    res.json(postComments);
  }else {
    next();
  }
})


export default commentsRouter;