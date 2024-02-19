import express from 'express';
import authMiddleware from '../middlewares/middleware.js';
import { AccountModel } from '../database/db.js';
import { z } from 'zod';
import mongoose from 'mongoose';

const accountsRouter = express.Router();

accountsRouter.get('/balance', authMiddleware, async (req, res)=>{
    try {
        const userAccount = await AccountModel.findOne({
            userID: req.userID
        });
    
        return res.json({
            balance: userAccount.balance
        });
    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(404).json({
            message: "Error getting user's account"
        })
    }
});

const transferSchema = z.object({
    to: z.string(),
    amount: z.number()
})

accountsRouter.post('/transfer', authMiddleware, async (req, res)=>{
    const transferBody = req.body;
    
    if(!transferSchema.safeParse(transferBody).success){
        return res.status(411).json({
            message: "Invalid inputs"
        });
    }

    const session = await mongoose.startSession(); // declare a session for transaction - to follow ACID 

    try {
        session.startTransaction(); // start the transaction
        const {to, amount} = transferBody;

        const toAccount = await AccountModel.findOne({
            userID: to
        }).session(session);
        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Reciever's Account Invalid"
            });
        }
    
        const fromAccount = await AccountModel.findOne({
            userID: req.userID
        }).session(session);
        if(!fromAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Your Account is Invalid"
            });
        }
    
        if(fromAccount.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insuffient balance"
            });
        }
    
        // Perform the transfer
        const result1 = await AccountModel.updateOne({
            userID: fromAccount.userID
        }, {
            balance: fromAccount.balance - amount
        }).session(session);
    
        const result2 = await AccountModel.updateOne({
            userID: toAccount.userID
        }, {
            balance: toAccount.balance + amount
        }).session(session);
    
        if(result1.acknowledged && result2.acknowledged){
            await session.commitTransaction(); // end the session
            return res.json({
                message: "Transfer successful"
            });
        }
        else{
            await session.abortTransaction();
            return res.json({
                message: "Error occured while transfer"
            });
        }
    } 
    catch (error) {
        console.log("Some error occured while transferring.",error.message, "\nRolling back the transaction" );
        await session.abortTransaction();
        return res.json({
            message: "Error occured while transferring. Rolling back transaction"
        });
    }
});

export default accountsRouter;