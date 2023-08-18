export interface Comment {
    _id: string;
    userID: string;
    recipeID: string;
    titles: string;
    desc?: string;
    date?:Date;
    like?:number[];
}