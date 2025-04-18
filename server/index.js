import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import paintRoutes from './routes/paintRoutes.js'

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors())
app.use(express.json({limit : '50mb'}))

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/paint',paintRoutes);

app.get('/',async(req, res) => {
    res.send('hello from dalle!')
})

const startServer= async () => {

    try{
        connectDB(process.env.MONGODB_URL)
        app.listen(PORT, ()=>{
            console.log(`server has started on port ${PORT}`);
        })
    } catch (error){
        console.log(error);
    }

}

startServer();