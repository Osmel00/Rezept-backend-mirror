```js
EndPoint: `/user/register`;
Method: POST;
Response: {
  newUser:{
  username,
  email,
  password,
  dateOfBirth,
  isVerified:false,
  info["empty"],
  image["empty"],
  wishlist["empty"];
  token,
  }
}
```

```js
EndPoint: `/user/login`;
Method: POST;
Response: {
  user:{
  username,
  email,
  password,
  dateOfBirth,
  isVerified:true,
  info["empty"],
  image["empty"],
  wishlist["empty"];
  token,
  }
}
```
