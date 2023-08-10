## Create Recipe

```js
EndPoint: `/recipe/create/<userID>`;
Method: POST;
body:{
  title: string;
  material: materialType[];
  desc?: string;
  image?: string[];
  category: string[];
  time: number;
};
Response: {
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
```

## get single Recipe

```js
EndPoint: `/recipe/<recipeID>`;
Method: GET;
body:-
Response: {
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
```

## get Recipes

```js
EndPoint: `/recipe/page/<page number>`;
Method: GET;
body:-
Response: [{},{}]
```
