import { Router } from "express";
import { users } from "../data/users.js";
import {error} from '../utils/error.js';

const usersRouter = Router();


/**
 * GET all users with filter option.
 */

usersRouter.get("/", (req,res) => {
    const {username, email} = req.query;

    // filter users on query based parameters as/if  provided

    let filteredUsers = users;

    if (username){
        filteredUsers = filteredUsers.filter(user=>user.username.toLowerCase().includes (username.toLerCase ()));
    }
    if (email){
        filteredUsers = filteredUsers.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
    }
    res.json(filteredUsers);
});


/**
 * GET user by Id
 */
usersRouter.get("/", (req,res, next) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user){
        return next(error("User not found"))
;    }
    // console.log(req.query);
    // console.log("APIKEY:::", req.key);

    res.json(user);
});

/**
 * POST to create a new user
 */

usersRouter.post("/", (req, res) => {
    const { name, username, email } = req.body;
    if (!name || !username || !email) {
        return res.status(400).json({ error: "All fields should be filled in" });
    }

    if (users.find((u) => u.username === username)) {
        return res.status(409).json({ error: "Username already in use" });
    }

    const newUser = {
        id: users[users.length - 1].id + 1,
        name,
        username,
        email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});


/**
 * PATCH
 */
usersRouter.patch("/:id", (req,res,next) => {
    const userIndex = users.findIndex((u) => u.id == req.params.id);
    if(userIndex === -1) {
        return next(error("Not Found"));

    }
    const updateUser = {...users[userIndex], ...req.body};
    users[userIndex] = updateUser;
    res.json(updatedUser);
});


/**
 * DELETE by user id
 */

usersRouter.delete ("/:id", (req, res, next) => {
    const id = req.params.id;
    const userIndex = users.findIndex((u) => u.id == req.params.id);

    if (userIndex === -1) {
        return next(error("Not Found"));
    }
const deleteUser = users.splice(userIndex, 1)[0];
res.json(deleteUser);
});

export default usersRouter;