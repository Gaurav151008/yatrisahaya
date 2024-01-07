const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('./models/config')

const userRouter = require('./routes/userRoutes');
const riderRouter = require('./routes/RiderRoutes');
app.use(cors())
app.use(bodyparser.json())
app.use(userRouter);
app.use(riderRouter);

app.get('/',(req,res)=>{
    res.send('<h1>hello world</h1>')
})

app.listen(5000,()=>{
    console.log("port is listening");
})