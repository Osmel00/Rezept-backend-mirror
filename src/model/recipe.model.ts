import { recipeType } from "../types/recipe";
import Recipe from "./recipe.schema";

export const recipePagination = async (
  pageNr: number,
  category: string[],
  sorting: string
) => {
  try {
    console.log(pageNr, category, sorting);
    const options = {
      page: pageNr,
      limit: 6,
      sort: { [sorting]: -1 },
    };
    console.log(options);
    let arrayCategory = { category: { $in: category } };
    const query = category ? arrayCategory : {};

    const data = await Recipe.paginate(query, options);

    return data;
  } catch {
    throw new Error();
  }
};

export const isUserIdRating = async (id: string, userId: string) => {
  try {
    const data = await Recipe.find({ _id: id, like: userId });

    return data;
  } catch {
    throw new Error();
  }
};

export const updateRecipeRewiews = async (
  id: string,
  userId: string,
  rating: number,
  rewiews: number
) => {
  try {
    const data = await Recipe.findByIdAndUpdate(id, {
      $push: { like: userId },
      rating: rating,
      view: rewiews,
    });

    return data;
  } catch {
    throw new Error();
  }
};

export const getRecipe = async (id: string) => {
  try {
    const data = await Recipe.findById(id);

    return data;
  } catch {
    throw new Error();
  }
};

export const callRecipes = async (
  number: number,
  count: number,
  sort: string,
  category: string[]
) => {
  try {
    if (number < 1) throw new Error();

    const list = await Recipe.find()
      .where("category")
      .in(category)
      .sort({ [sort]: -1 })
      .skip((number - 1) * count)
      .limit(count);

    return list;
  } catch {
    throw new Error();
  }
};

export const callUserRecipes = async (
  id: string,
  count: number,
  sort: string,
  category: string[]
) => {
  try {
    const list = await Recipe.find({})
      .where("userID")
      .equals(id)
      .sort({ [sort]: -1 });
    // .skip((number - 1) * count)
    // .limit(count);

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

export const deleteRecipe = async (id: string, userID: string) => {
  try {
    const recipe = await Recipe.findById(id);
    if (recipe?.userID == userID) {
      return Recipe.findByIdAndDelete(id);
    } else {
      throw new Error();
    }
  } catch (err) {
    throw new Error();
  }
};

export const updateRecipe = async (
  id: string,
  userID: string,
  data: object
) => {
  try {
    const recipe = await Recipe.findById(id);
    if (recipe?.userID == userID) {
      return Recipe.findByIdAndUpdate(data);
    } else {
      throw new Error();
    }
  } catch (err) {
    throw new Error();
  }
};

export const callWishList = async (list: string[]) => {
  try {
    const wishList = await Recipe.find().where("_id").in(list);

    return wishList;
  } catch {
    throw new Error();
  }
};

export const getALlRecipeBYCategory = async (category: string) => {
  try {
    const data = await Recipe.find({ category: category });

    return data;
  } catch {
    throw new Error();
  }
};
