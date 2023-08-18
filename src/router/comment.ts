import express from "express";
const router = express.Router();

import { createComment,getAllComments } from "../controller/comment.controller";
router.post('/',createComment);
router.get('/:id',getAllComments);// this id come from RecipeId

export default router;
