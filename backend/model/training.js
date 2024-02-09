import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema ({
    trainingName : {
        type : String
    },
    certificateID : {
        type : String
    },
    trainStart : {
        type : String
    },
    trainEnd : {
        type : String
    }
},
{
    timestamps : true
})

export const Training = mongoose.model("training", trainingSchema);