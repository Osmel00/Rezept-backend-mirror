import { Comment } from "../types/comment";
import CommentModel from "../model/comment.schema";

export const allComments = async (recipeId: string) => {
  try {
    const data = await CommentModel.find({recipeID:recipeId}).populate('userID',['image','username']);
    
    console.log(data);
    return data; // returns all comments for a specific recipe with the user's image and username
  } catch {
    throw new Error();
  }
};


export const createNewComment = async (data: Comment) => {
    try {
      const newItem = await CommentModel.create(data);
      return newItem;
    } catch (err) {
      throw new Error();
    }
  };