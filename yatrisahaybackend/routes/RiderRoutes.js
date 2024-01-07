const express = require('express');

const riderRouter = express.Router();

const riders = require('../models/riders');

riderRouter.post('/RiderSignup', async(req,res)=>{
    try{
        let rider = new riders(req.body);
        let result = await rider.save();

        res.status(200).json({
            message: 'Registered successfully', data:{ ...rider}
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
})

riderRouter.post('/RiderSignin', async(req,res)=>{
    try{
        if(req.body.email && req.body.password){
            let rider = await riders.findOne(req.body);

            if(!rider){
                res.status(401).json({
                    message: 'Invalid email or password'
                });
            }
            if (req.body.password !== rider.password) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
              }
          
              res.status(200).json({ message: 'Login successful', data: { ...rider } });

        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = riderRouter;