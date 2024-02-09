import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "employee_crm",
    })
    .then(() => console.log("Employee CRM Database Connected"))
    .catch((e) => console.log(e));
}