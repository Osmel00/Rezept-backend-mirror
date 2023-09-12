import mongoose, { Schema, Document } from "mongoose";
import { recipeType } from "./../types/recipe";

const recipeSchema: Schema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    material: { type: Object },
    desc: { type: String },
    image: { type: Array, default: [""] },
    like: { type: Array, default: [0] },
    category: { type: Array },
    view: { type: Number, default: 0 },
    time: { type: Number, default: 1, required: true },
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const RecipeModel = mongoose.model<recipeType & Document>(
  "Recipe",
  recipeSchema
);

export default RecipeModel;
