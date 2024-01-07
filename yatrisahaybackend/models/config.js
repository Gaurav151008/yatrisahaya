const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/yatrisahayak")

mongoose.connection.on('error',(err)=>{
    console.error('Mongoose Connection error',err);
})

mongoose.connection.once('open',()=>{
    console.log('Connected');
})