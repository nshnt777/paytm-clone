import express from 'express';
import router from './routes/index.js'
import cors from 'cors'

const app = express();
const port = 3000;

app.use(cors());
//disable cors errors

app.use(express.json());
// body parser

app.use('/api/v1', router);
// all backend calls will start from /api/v1/....

// routes: 
// 1. sign up
// 2. sign in
// 3. update first name, last name, password

app.listen(port, ()=>{
    console.log('Listening at port '+port);
});