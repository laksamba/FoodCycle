import express from 'express'
import connectDB from './config/db.js';


const app = express();
connectDB();

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("FoodCycle Nepal platform");
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

