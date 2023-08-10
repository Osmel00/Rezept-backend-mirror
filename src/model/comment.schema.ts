import mongoose, { Schema, Document } from "mongoose";
import { Comment } from "../types/comment";

const commentSchema: Schema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      require: true,
    },
    title: { type: String, required: true },
    desc: { type: String },
    date: { type: Date },
    like: { type: Array, default: [0] },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model<Comment & Document>("Comment",commentSchema);

export default CommentModel;