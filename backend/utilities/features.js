import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
  path: "./configuration/.env",
});

export const sendCookie = (
  user,
  res,
  message,
  expiresInDays = 3,
  statusCode = 200
) => {
  try {
    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: `${expiresInDays}d`,
    });

    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
      // Add the 'SameSite=None' attribute for cross-origin requests

      //sameSite: "None",

      // Add the 'Secure' attribute for HTTPS connections
    //   secure: true,
    };

    // console.log(user)

    res
      .cookie("token", token, options)
      .status(statusCode)
      .json({
        success: true,
        token,
        user,
        message: `${message}`,
      });
  } catch (error) {
    console.error("Error generating JWT or setting cookie:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
