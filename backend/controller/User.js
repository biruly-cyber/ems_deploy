import {User} from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { sendCookie } from "../utilities/features.js";



// register
export const registration = async (req, res) => {
  // console.log(req.body)
  // fetch all data from request body
  const { name, email, password, designation, designationType } = req.body;

  
  try {
    // validation
    if (!name || !email || !password || !designation || !designationType) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }
    
    // check if email is exist
    const isEmailExist = await User.findOne({ email });
    
    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }
    
    //encrypt password
    const hashPassword = await bcrypt.hash(password, 10);


    //designation type convert it into lowercase()
    const lowercaseDesignationType = designationType.toLowerCase();
    
    // create entry on db
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      designation,
      designationType: lowercaseDesignationType
    });

    //return the result
    sendCookie(user, res, `Account created successfully!`, 201);
   
  } catch (error) {
    return res.status(500).json({
        success:false,
        message: error
    })
  }
};


//login
export const login =  async(req, res)=>{
  // fetch all the data from request body
  const {email, password} = req.body
  
  console.log("working")
  try {
    // validation 
    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: "Email does not exist! Please Register!"
      })
    }
    
    // check email exist ot not
    
    const user = await User.findOne({email}).select("+password")
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Email does not exist! Please Register!"
      })
      
    }
    
    // console.log(user)
    // compare password 
    const isMatch = await bcrypt.compare(password, user.password)
    // console.log("working")

        if(!isMatch){
          return res.status(400).json({
            success: false,
            message: "Please enter correct password!"
          })
        }


         // Generate a JSON Web Token (JWT)
      sendCookie(user, res, `welcome back ${user.name} `, 200);
    } catch (error) {
        res.status(500).json({
          success:false,
          message: error
        })
    }
}

//handle for get user details
export const getMyProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "details is fetched",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//handle for logout
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "logout successfully!",
        user: null,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



