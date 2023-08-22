import { Request, Response } from "express";
import {
  createNewRecipe,
  getRecipe,
  callRecipes,
  callUserRecipes,
  deleteRecipe,
  updateRecipe,
} from "../model/recipe.model";

export const getSingleRecipe = (req: Request, res: Response) => {
  const { id } = req.params;

  getRecipe(id)
    .then((resolve) => res.status(200).send(resolve))
    .catch((err) => {
      res.send(500).send("error while get this recipe from db");
    });
};

export const getRecipes = (req: Request, res: Response) => {
  const { number } = req.params;
  const { sort = "createdAt", category = [""], count = 12 } = req.body;

  callRecipes(parseInt(number), count, sort, category)
    .then((resolve) => res.status(200).send(resolve))
    .catch((err) => {
      res.status(500).send("error while get recipes from db");
    });
};

export const getUserRecipes = (req: Request, res: Response) => {
  const { id } = req.params;
  const { sort = "createdAt", category = [""], count = 12 } = req.body;

  callUserRecipes(id, count, sort, category)
    .then((resolve) => res.status(200).send(resolve))
    .catch((err) => {
      res.status(500).send("error while get recipes from db");
    });
};

export const createRecipe = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  data.userID = id;
  data.category.unshift("");

  createNewRecipe(data)
    .then((resolve) => res.status(201).send(resolve))
    .catch((err) => {
      res.status(500).send("error while create new recipe");
    });
};

export const deleteSingleRecipe = (req: Request, res: Response) => {
  const { id } = req.params;
  const { userID } = req.body;

  deleteRecipe(id, userID)
    .then((resolve) => res.status(204).send(resolve))
    .catch((err) => {
      res.status(500).send("error while delete new recipe");
    });
};

export const updateSingleRecipe = (req: Request, res: Response) => {
  const { id } = req.params;
  const { userID, recipe } = req.body;

  updateRecipe(id, userID, recipe)
    .then((resolve) => res.status(200).send(resolve))
    .catch((err) => {
      res.status(500).send("error while update new recipe");
    });
};
