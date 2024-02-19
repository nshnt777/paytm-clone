import express from 'express';
import router from './routes/index.js'
import cors from 'cors'

const app = express();
const port = 3000;

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://paytm-clone-phi.vercel.app');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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