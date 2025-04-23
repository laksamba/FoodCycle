import express from 'express'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'; 
import {createServer} from 'http';
import { initSocket } from './utils/socket.js';


const app = express();
const server = createServer(app);
const io = initSocket(server);

app.use(express.json());
// connectDB();

//routes 
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/order',orderRoutes)
app.use('/api/admin',adminRoutes)

const PORT = process.env.PORT || 5000


const startServer = async () => {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };
  
  startServer();
