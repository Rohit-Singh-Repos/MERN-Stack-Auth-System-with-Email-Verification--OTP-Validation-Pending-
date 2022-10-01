const UserInfoModel = require("../models/userInfo.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/emailConfig");

class UserAuthController {
  
  static registerUser = async(req, res) => {
    const { name, email, password, tc } = req.body; // Data Coming from Frontend or, postman
    const findEmailFromDatabase = await UserInfoModel.findOne({
      useremail: email,
    });
    if (findEmailFromDatabase) {
      res.send({
        status: "failed",
        message: "Email already exists",
        statuscode: 409,
      });
    } else {
      if (name && email && password && tc) {
        try {
          const bcryptSalt = await bcrypt.genSalt(10); // Generating Bycrypt Salt
          const hashedPassword = await bcrypt.hash(password, bcryptSalt); // Hashed our password
          const getDataFromUser = new UserInfoModel({
            username: name,
            useremail: email,
            userpassword: hashedPassword,
            termandconditions: tc,
          });
          const saveUserInfo = await getDataFromUser.save({
            validateBeforeSave: false,
          });

          // Generate JWT Token
          const jwt_options = {
            expiresIn :"1d",
            algorithm:"HS256"
          }
          const jwt_token = jwt.sign({userID:saveUserInfo._id},process.env.JWT_SECRET_KEY,jwt_options)
          res.status(201).send({
            status:"success",
            message:"successfully registered",
            token:jwt_token
          });
          
        } catch (error) {
          res.send({ status: "failed", message: "Unable to register" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  static loginUser = async(req,res) => {
    try {
        const {email,password} = req.body;
        if(email && password){
            const findEmailFromDatabase = await UserInfoModel.findOne({
                useremail: email,
            });
            if(findEmailFromDatabase){
                const matchPassword = await bcrypt.compare(password,findEmailFromDatabase.userpassword)

                if (findEmailFromDatabase.useremail === email && matchPassword) {
                   
                    // Generate JWT Token
                    const jwt_options = {
                        expiresIn :"1d",
                        algorithm:"HS256" // Other Algorithms Mentioned on JWT Repo
                    }
                    const jwt_token = jwt.sign({userID:findEmailFromDatabase._id},process.env.JWT_SECRET_KEY,jwt_options) 
                    res.send({
                        status: "success",
                        message: "Authenticated",
                        token:jwt_token
                    });

                } else {
                  res.send({
                    status: "failed",
                    message: "Invalid User",
                  });
                }
            }else{
                res.send({
                    status:"failed",
                    message:"Not a registered user"
                })
            } 
        }else{
           res.send({
                status:"failed",
                message:"All fields are required"
            })  
        } 
    } catch (error) {
        res.send({status:"failed",message:"Invalid Data"})
    }
  }

  static sendPasswordResetEmailToUser = async(req,res) => {
    const { email } = req.body
    try {
      if(email){
        const user = await UserInfoModel.findOne({useremail:email})
        if(user){
          const secretKeyForLink = user._id + process.env.JWT_SECRET_KEY;
          const token = jwt.sign({userID:user._id},secretKeyForLink,{
            expiresIn:"10m"
          })
          const emailLink = `http://localhost:3000/api/user/resetpassword/${user._id}/${token}`
          let emailInfo = await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:user.useremail,
            subject:"Password Reset Link",
            html:`
              <h3>Click on the Below Link to Reset your password</h3>
              <a href=${emailLink}>Click here to reset your password</a>
              <p>This link will expires in 10 minutes.</p>
            `
          })
          
          res.send({status:"success",message:"Password reset link is sent ... check your email",info:emailInfo})
        }else{
          res.status(400).send({status:"failed",message:"Email doesn't Exists"})
        }
      }else{
        res.send({status:"failed",message:"Email is Required"})
      }
    } catch (error) {
      res.send({status:"failed",message:"Invalid Data"})
    }
  }

  static resetUserPassword = async(req,res) => {
    const { password } = req.body;
    const { id,token } = req.params;
    const user = await UserInfoModel.findById(id);
    const newSecret = user._id + process.env.JWT_SECRET_KEY;
    try {
      const result = jwt.verify(token,newSecret);
      if(password && result){
        const passwordSalt = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(password,passwordSalt);
        const passwordReset = await UserInfoModel.findByIdAndUpdate(user._id,{
          $set:{userpassword:hashNewPassword}
        })
        res.send({status:"success",message:"Password Reset Successfully"})
      }else{
        res.send({status:"failed",message:"Password is empty"})
      }
    } catch (error) {
      res.send({status:"failed",message:"Invalid Token"})
    }
  }

  // This is after login process when user is logged in
  static changeUserPassword = async(req,res) => {
    const { password } = req.body
    if(password){
        const bcryptSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,bcryptSalt);
        if(req.user){
          const result = await UserInfoModel.findByIdAndUpdate(req.user._id,{$set:{userpassword:hashedPassword}})
          res.send({status:"success",message:"Password Changed Successfully"})
        }else{
          res.send({status:"Failed",message:"No User Found"})
        }
    }else{
        res.send({
            status:"Failed",
            message:"Password is required"
        })
    }
  }

  // This is after login process when user is logged in
  static getLoggedInUserInfo = async(req,res) => {
    if(req.user){
      res.send({userData:req.user})
    }else{
      return null
    }
  }

}

module.exports = UserAuthController;
