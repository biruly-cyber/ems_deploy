import { app } from "./app.js";
import { connectDB } from "./configuration/database.js"

// define port with default port 5000
const PORT = process.env.PORT || 5000


//connect database
connectDB()
app.listen(PORT, ()=>{
    console.log(`server is wrking on port ${PORT}`);  
})
