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
  };
  statusCode 201
```

## get single Recipe

```js
EndPoint: `/recipe/<recipe ID>`;
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
body: {
  sort?: "createdAt" (Default) | "view" | "time";
  category?;
  count? (default 12) // page size
}
Response: [{}, {}];
```

## get users all Recipe

```js
EndPoint: `/recipe/user/<user id>`;
Method: GET;
body: {
  sort?: "createdAt" (Default) | "view" | "time";
  category?;
  count? (default 12) // page size
}
Response: [{}, {}];
```

## Delete Recipe

```js
EndPoint: `/recipe/<recipe id>`;
Method: DELETE;
body: {
  userID; // user must be creator
}
Response: [statusCode 204];
```

## Update Recipe

```js
EndPoint: `/recipe/<recipe id>`;
Method: PUT;
body: {
  userID; // user must be creator
  data; // an Object of all required item in recipe
}
Response: [statusCode 200];
```
