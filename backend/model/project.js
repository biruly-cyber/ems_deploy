import mongoose from "mongoose";
import nodemailer from "nodemailer";



const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    projectStartDate: {
      type: String,
      required: true,
    },
    projectEndDate: {
      type: String,
    },
    priority:{
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"employee_details",
      required:true
    },
    
    adminId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users",
      required: true
    },
    teamId: {
      type:mongoose.Schema.Types.ObjectId,
        ref:"Teams_Detail",
        required:true
    },
    websiteUrl: {
      type: String,
    },
    isCompleted:{
      type:Boolean,
      default: false
    },
    isScrap:{
      type:Boolean,
      default: false 
    },
    completedPercent:{
      type:Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

// code  for send mail to  the team members and manager 
projectSchema.post("save", async function(doc) {
  try {
    // console.log("DOC", doc)


    // transporter 
    let transporter = nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
      },
    })  
    
    // Send mail
    let info = await transporter.sendMail( {
      from :"Blurock Innovation | EMS",
      // to: doc.email 
      // hare we give the emails of all the members of team and all the mananger hare is code 
      to:` arunupadhayay2000@gmail.com`,
     
      // to: allEmails.join(', '), // Combine emails into a comma-separated string
      subject: "New project is created",
      html: `<h2>New Project ${doc.projectName}</h2>`

    })

  }catch(error){
    console.error("error to send mail ")
  }
})



export const Project = mongoose.model("project", projectSchema)