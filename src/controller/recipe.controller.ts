import { Request, Response } from "express";
import { createNewRecipe, getRecipe, callRecipes } from "../model/recipe.model";

export const getSingleRecipe = (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id);

  getRecipe(id)
    .then((resolve) => res.status(200).send(resolve))
    .catch((err) => {
      res.send(500).send("error while get this recipe from db");
    });
};

export const getRecipes = (req: Request, res: Response) => {
  const { number } = req.params;
  const count = 12;

  callRecipes(parseInt(number), count)
    .then((resolve) => res.status(200).send(resolve))
    .catch((err) => {
      res.status(500).send("error while get recipes from db");
    });
};

export const createRecipe = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  data.userID = id;

  createNewRecipe(data)
    .then((resolve) => res.status(201).send(resolve))
    .catch((err) => {
      res.status(500).send("error while create new recipe");
    });
};
