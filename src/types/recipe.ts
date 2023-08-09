export interface recipeType {
  _id: string;
  userID: string;
  title: string;
  material: materialType[];
  desc?: string;
  image?: string[];
  like?: number[];
  category: string[];
  view: number;
  time: number;
  modifyDate?: Date;
}

export interface materialType {
  name: string;
  count: number;
  unit: string;
}
