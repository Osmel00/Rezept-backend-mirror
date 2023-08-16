## Create Comment

```js

EndPoint: `/comment`;
Method: POST;
body:{
    userID: string;
    recipeID: string;
    titles: string;
    desc?: string;
    date?:Date;
    like?:number[];
};

Response: {
    _id: string;
    userID: string;
    recipeID: string;
    titles: string;
    desc?: string;
    date?:Date;
    like?:number[];
}
```
## get All Comments by RecipeId


```js
EndPoint: `/comment/<id>`; // this id come from RecipeId
Method: GET;
body:-
Response: [{comment},{comment}] // return array of comments width user' images
```