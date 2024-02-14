import express from 'express'
import jwt from 'jsonwebtoken';
import {z} from 'zod'
import {AccountModel, UserModel} from '../database/db.js'
import env from 'dotenv'
env.config();
import authMiddleware from '../middlewares/middleware.js'

const userRouter = express.Router();

const JWT_KEY = process.env.JWT_SECRET;

const signupSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8)
});

userRouter.post('/signup', async (req, res)=>{
    const signupBody = req.body;
    try {
        if(!signupSchema.safeParse(signupBody).success){
            return res.status(411).json({
                message: "Incorrect data entered"
            });
        }
    
        const existingUser = await UserModel.find({username: signupBody.username});
        if(existingUser.length > 0){
            return res.status(411).json({
                message: "Email already taken"
            });
        }
        else{
            const user = await UserModel.create(signupBody);
            const randBalance = (Math.random()*10000)+ 1;

            const account = await AccountModel.create({
                userID: user._id,
                balance: randBalance
            });

            const token = jwt.sign({userID: user._id}, JWT_KEY);
    
            return res.status(200).json({
                message: "User created successfully",
                token: token
            })
        }
    } catch (error) {
        console.log("Error: ", error.message);
    }
});

const loginSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8)
});

userRouter.post('/login', async (req,res)=>{
    const loginBody = req.body;
    try {
        if(!loginSchema.safeParse(loginBody).success){
            return res.status(411).json({
                message: "Incorrect data entered"
            });
        }
    
        const existingUser = await UserModel.findOne({
            username: loginBody.username,
            password: loginBody.password
        });
        if(!existingUser){
            return res.status(411).json({
                message: "Error while logging in"
            })
        }
        else{
            const token = jwt.sign({userID: existingUser._id}, JWT_KEY);
    
            return res.status(200).json({
                token: token
            });
        }
    } catch (error) {
        console.log("Error: ", error.message);
    }
});

const updateSchema = z.object({
    password: z.string().min(8).optional() ,
    firstName: z.string().optional(),
    lastName:  z.string().optional()
});

userRouter.put("/", authMiddleware, async (req,res)=>{
    const updateBody = req.body;
    const userID = req.userID;

    if(!updateSchema.safeParse(updateBody).success){
        res.status(411).json({
            message: "Invalid data given"
        });
    }

    try {
        const userDataUpdate = await UserModel.updateOne({_id: userID}, updateBody)
        
        if(userDataUpdate.acknowledged){
            return res.status(200).json({
                message: "Updated successfully"
            });
        }
        else{
            res.status(411).json({
                message: "Error while updating information"
            })
        }
    } catch (error) {
        console.log("Error: ", error.message);
    }
});

userRouter.get("/bulk", async (req,res)=>{
    const filter = req.query.filter;

    let foundUsers = []

    if(!filter){
        foundUsers = await UserModel.find({}, {
            username: 1,
            firstName: 1,
            lastName: 1,
            _id: 1
        });
    }
    else{
        foundUsers = await UserModel.find({
            $or: [{firstName: /filter/i}, {lastName: /filter/i}]
        }, {
            username: 1,
            firstName: 1,
            lastName: 1,
            _id: 1
        });
    }

    if(foundUsers.length > 0){
        return res.status(200).json({
            users: foundUsers
        });
    }
    else{
        return res.status(404).json({
            message: "No users found"
        })
    }
    
})

export default userRouter;