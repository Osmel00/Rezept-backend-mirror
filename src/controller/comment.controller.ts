import { Request, Response } from "express";
import { allComments,createNewComment } from "../model/comment.model";


export const getAllComments = async (req: Request, res: Response)  => {
   
    const { id } = req.params;
    allComments(id).then(comments => res.status(200).send(comments)).catch((err) => {
        res.status(500).send("error while get this comments from db");
      });
   
  };

  export const createComment = (req: Request, res: Response) => {
    const data = req.body;
  
  
    createNewComment(data)
      .then((comment) => res.status(201).send(comment))
      .catch((err) => {
        res.status(500).send("error while create new comment");
      });
  };
  