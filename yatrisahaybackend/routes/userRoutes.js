const express = require('express');

const userRouter = express.Router();
const users = require('../models/users')

userRouter.post('/signup', async(req,res)=>{

    try{
        let user = new users(req.body);
        let result = await user.save();
        console.log(result);
        res.status(200).json({ message: 'Registered successful', data: { ...user } });
    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: 'Internal server error' });
    }
})


userRouter.post('/signin', async(req,res)=>{
    try{
        
        if(req.body.email && req.body.password){
            let user = await users.findOne(req.body);

            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
              }
          
              if (req.body.password !== user.password) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
              }
          
              res.status(200).json({ message: 'Login successful', data: { ...user } });
        }
    }
    catch(e){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = userRouter;