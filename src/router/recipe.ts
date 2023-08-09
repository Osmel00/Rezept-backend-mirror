import express from "express";
const router = express.Router();

import {
  createRecipe,
  getSingleRecipe,
  getRecipes,
} from "./../controller/recipe.controller";

router.get("/:id", getSingleRecipe);

router.get("/page/:number", getRecipes);

router.post("/create/:id", createRecipe);

export default router;
