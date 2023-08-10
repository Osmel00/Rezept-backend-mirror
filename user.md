##Register

```js
EndPoint: `/user/register`;
Method: POST;
body:{
  username:string,
  email:string,
  password:string,
  confirmPassword:string,
  dateOfBirth?:Date,
}
Response: {
  newUser:{

    username:string,
    email:string,
    password:string,
    dateOfBirth:Date,
    isVerified:boolean,
    info["empty"]?:string[],
    image["empty"]?:string[],
    wishlist["empty"]?:string[];
}
    token:string,

}
```

## Email verification

```js
EndPoint: `/user/verify/:token`;
Method: GET;
body: -,
Response: {
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

## Login

```js
EndPoint: `/user/login`;
Method: POST;
body:{
  email:string,
  password:string,
}
Response: {
  user:{
    username:string,
    email:string,
    password:string,
    dateOfBirth:Date,
    isVerified:boolean,
    info["empty"]?:string[],
    image["empty"]?:string[],
    wishlist["empty"]?:string[];
  }
   token:string,
}
```

## Write your Email to Change Password

```js
EndPoint: `/user/forgot-password`;
Method: POST;
body:{
email:string,
}
Response: {
  user:{
    username:string,
    email:string,
    password:string,
    dateOfBirth:Date,
    isVerified:boolean,
    info["empty"]?:string[],
    image["empty"]?:string[],
    wishlist["empty"]?:string[];
    verificationCodeForgotPassword:string,
  }
   token:string
}
```

## Write your Verification Code to change Passowrd

```js
EndPoint: `/user/verify-verification-code/:email`;
Method: POST;
body:{
verificationCodeForgotPassword:string,
}
Response: {
  user:{
    username:string,
    email:string,
    password:string,
    dateOfBirth:Date,
    isVerified:boolean,
    info["empty"]?:string[],
    image["empty"]?:string[],
    wishlist["empty"]?:string[];
    verificationCodeForgotPassword:string,
  }
    token:string
}
```
