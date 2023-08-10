import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

/** routers */
import userRouter from "./router/user";
import recipeRouter from "./router/recipe";
import commentRouter from "./router/comment";
import emailRouter from "./router/user";

import { errorHandler } from "./middelware/errorHandler";

/** */
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(
      //"mongodb://127.0.0.1:27017/recipe-sharing",
      "mongodb+srv://aliho3einde:qPRehosjqi7aUr63@cluster0.oiaok8u.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    console.log("Connected to DB");
  } catch (error) {
    console.log("Couldn't connect to DB", error);
  }
};

connectDb();

// Define your routes here
app.get("/", (req: Request, res: Response) => {
  res.send("recipe sharing");
});
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/comment", commentRouter);
app.use("/email", emailRouter);

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
