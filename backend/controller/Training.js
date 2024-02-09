import { Training } from "../model/training.js";

// Training feature 

export const addTraining = async (req, res) => {
    const {
        trainingName,
        certificateID,
        trainingStart,
        trainingEnd
    } = req.body

    try{
        // validation
        if(!trainingName){
            return res.status(400).json({
                success:false,
                message:"training name is required"
            })
        }

        // Create entry on DB 
        const trainingcreate = await Training.create({
            trainingName,
            certificateID,
            trainStart : trainingStart,
            trainEnd : trainingEnd,
        })

        return res.status(200).json({
            success:true,
            trainingcreate,
            message:"training added successfully"
        })

    } catch (e) {
        return res.status(500).json({
            success:false,
            message:e
        })
    }
}

export const showtraining = async (req, res) => {
    try {
        const showTrain = await Training.find({})

        if(!showTrain){
            res.status(500).json({
                success:false,
                message:"No training added yet"
            })
        }

        res.status(200).json({
            success:true,
            showTrain,
            message:"trainings added"
        })
    }
    catch (e) {
        return res.status(500).json({
            success:false,
            message:e
        })
    }
}

