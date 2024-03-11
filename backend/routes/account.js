// backend/routes/account.js
const express = require('express');
const authMiddleware = require('../middleware');
const { Account } = require('../db/model');
const { default: mongoose } = require('mongoose');
const z = require("zod")
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        user: req.userId
    });

    res.json({
        balance: account.balance
    })
});

const validateTo = z.object({
    to: z.string().length(24)
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const success = validateTo.safeParse(req.body.to);
    
    console.log(success)
    if(!success){
        return res.status(400).json({
            message:"wrong inputs"
        })
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    
    
    const { amount, to } = req.body;

   
    const account = await Account.findOne({ user: req.userId }).session(session);

    if (!account ) {
        await session.abortTransaction();
        return res.status(404).json({
            message: "account not found"
        });
    }
    if(account.balance < amount){
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ user: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ user: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ user: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    return res.json({
        message: "Transfer successful"
    });
});

router.get("account", (req,res)=>{
  res.json("acccount")
})
module.exports = router;