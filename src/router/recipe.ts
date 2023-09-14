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
  getRecipeByCategory,
  setRecipeRewiews,
  getUserIdRating,
} from "./../controller/recipe.controller";

router
  .route("/:id")
  .get(getSingleRecipe)
  .delete(deleteSingleRecipe)
  .put(updateSingleRecipe);

router.get("/page/:number", getRecipes);

router.get("/user/:id", getUserRecipes);

router.get("/wishlist", getWishList);
router.get("/category/:category", getRecipeByCategory);
router.get("/user/:userId/userating/:id", getUserIdRating);
router.post("/create/:id", createRecipe);
router.put("/rewiews/:id", setRecipeRewiews);

export default router;
