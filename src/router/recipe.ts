import express from "express";
const router = express.Router();

import {
  createRecipe,
  getSingleRecipe,
  getRecipes,
  getUserRecipes,
  deleteSingleRecipe,
  getWishList,
  updateSingleRecipe,
} from "./../controller/recipe.controller";

router
  .route("/:id")
  .get(getSingleRecipe)
  .delete(deleteSingleRecipe)
  .put(updateSingleRecipe);

router.get("/page/:number", getRecipes);

router.get("/user/:id", getUserRecipes);

router.get("/wishlist", getWishList);

router.post("/create/:id", createRecipe);

export default router;
