import { recipeType } from "../types/recipe";
import Recipe from "./recipe.schema";

export const getRecipe = async (id: string) => {
  try {
    const data = await Recipe.findById(id);
    console.log(data);

    return data;
  } catch {
    throw new Error();
  }
};

export const callRecipes = async (number: number, count: number) => {
  try {
    if (number < 1) throw new Error();

    const list = await Recipe.find({})
      .sort({ date: 1 })
      .skip((number - 1) * count)
      .limit(count);

    return list;
  } catch {
    throw new Error();
  }
};

export const createNewRecipe = async (data: recipeType) => {
  try {
    const newItem = await Recipe.create(data);
    return newItem;
  } catch (err) {
    throw new Error();
  }
};
