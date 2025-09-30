import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from './configs/db.js';
import adminRouter from './routes/Adminroutes.js';
import BlogRouter from './routes/Blogroutes.js';

const app = express();

//DataBase
await connectDB()


//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//Routes
app.get('/',(req,res)=>{res.send("Hello")})
app.use("/api/admin",adminRouter);
app.use("/api/blog",BlogRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server is runnion on PORT:http://localhost:${PORT}`))

export default app;





