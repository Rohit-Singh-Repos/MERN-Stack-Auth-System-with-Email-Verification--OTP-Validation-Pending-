const jwt = require("jsonwebtoken");
const UserInfoModel = require("../models/userInfo.model");


const checkuserauthmiddleware = async(req,res,next) => {
    let token;
    const { authorization } = req.headers;
    console.log("request",authorization)
    if(authorization && authorization.startsWith("Bearer")){
        try {
            // Getting Token from Header
            token = authorization.split(' ')[1];
            
            // Verify Token, Here userID comes from "registerUser" method in our controller where we create our JWT token through "jwt.sign({userID:saveUserInfo._id},process.env.JWT_SECRET_KEY,jwt_options)"

            // Also we need to verify our JWT_SECRET_KEY in order to get userID
            const { userID } = jwt.verify(token,process.env.JWT_SECRET_KEY);
            
            //Get User From Token
            req.user = await UserInfoModel.findById(userID).select("-userpassword")
            next()
        } catch (error) {
            res.status(401).send({status:"failed",message:"Unauthorized User"})
        }
    }else{
        res.status(401).send({status:"Failed",message:"Auth Token Required"})
    }
}

module.exports = checkuserauthmiddleware

/*

NOTE :- 

=> Just like "req.body" we have "req.headers" through which we can fetch "Authorization","Content-Type" property from API headers.

=> Frontend Case -- In case of frontend we can pass the headers through the api as shown below and can fetch the token in backend with "req.headers".

headers:{
    Content-Type:"application/json",
    Authorization:"Bearer" + your_token
}

=> Backend Case -- In case of backend we can pass the headers through postman as shown below and can fetch the token in backend with "req.headers".


Method 1 for passing token in Postman 
------------------------------------------------
headers:{
    Content-Type:"application/json",
    Authorization:Bearer + your_token
}

Method 2 for passing token in Postman 
------------------------------------------------

=> We can also pass token through Postman to all api requests from "Click on Authorization tab -> Choose Bearer Token -> Paste your token into the input box"

*/ 