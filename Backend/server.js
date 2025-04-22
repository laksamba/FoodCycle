import express from 'express'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js'


const app = express();
app.use(express.json());
connectDB();

//routes 
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/order',orderRoutes)

const PORT = process.env.PORT || 5000


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

