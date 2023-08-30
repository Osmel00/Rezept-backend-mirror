## Register

```js
EndPoint: `/user/registrieren`;
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
    _id:string,
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
EndPoint: `/user/verifizieren/:token`;
Method: GET;
body: -,
Response: {
  _id:string,
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
```

## Login

```js
EndPoint: `/user/anmelden`;
Method: POST;
body:{
  email:string,
  password:string,
}
Response: {
  user:{
    _id:string,
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
EndPoint: `/user/passwort-vergessen`;
Method: POST;
body:{
email:string,
}
Response: {
  user:{
    _id:string,
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
EndPoint: `/user/verifiziere-verifikationscode/:id`;
Method: POST;
body:{
verificationCodeForgotPassword:string,
}
Response: {
  user:{
    _id:string,
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

## Reset Password

```js
EndPoint: `/user/passwort-zuruecksetzen/:id`;
Method: PUT;
body:{
  password:string,
  confirmPassword:string,
}
Response: {
  user:{
    _id:string,
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

## Contact

```js
EndPoint: `/user/contact`;
Method: POST;
body:{
  email:string,
  username:string,
  subject:string,
  textMessage:string,
}
Response: {
  newContact:{
    _id:string,
    username:string,
    email:string,
    subject:string,
    textMessage:string,
  }
}
```

## google Checking

```js
EndPoint: `/user/checkgoogle`;
Method: POST;
body:{
  auf googlebtn klicken
}
Response: {
  user:{
    _id:string,
    username:string,
    email:string,
    password:string,
    isVerified:boolean,
    info["empty"]?:string[],
    image["empty"]?:string[],
    wishlist["empty"]?:string[];
  }
}
```

## Contact

```js
EndPoint: `/user/contact`;
Method: POST;
body:{
  email:string,
  username:string,
  subject:string,
  textMessage:string,
}
Response: {
  newContact:{
    _id:string,
    username:string,
    email:string,
    subject:string,
    textMessage:string,
  }
}
```

## Get User By Id

```js
EndPoint: `/user/:id`;
Method: GET;
body:{
  -
}
Response: {
  user:{
    _id:string,
    username:string,
    email:string,
    password:string,
    isVerified:boolean,
    info["empty"]?:string[],
    image["empty"]?:string[],
    wishlist["empty"]?:string[];
  }
}
```
