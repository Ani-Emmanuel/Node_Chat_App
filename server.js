const express = require('express');
const bodypaser  = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require("mongoose");
const port = process.env.port || 3000;
app.use(express.static(__dirname));

require('dotenv').config();
const dburl = process.env.DB_CONNECTION;
const Message = mongoose.model('Message',{
    name: String,
    message: String
})

app.use(bodypaser.json());
app.use(bodypaser.urlencoded({extended:false}));

app.get('/message', (req,res)=>{
    
    Message.find({},(err, message)=>{
        if(err)
            res.statusCode(404);
        res.send(message);
    })
});

app.get('/message/:user',  (req,res)=>{
    
     Message.find({name: req.params.user},(err, message)=>{
        if(err)
            res.statusCode(404);
        res.send(message);
    })
});

app.post('/message', async (req,res)=>{
    try {
        
        const messages = new Message(req.body)
        const savedMessage = await messages.save()
            if(savedMessage)
                console.log("Saved");
        const sencored = await Message.findOne({message:"badword"});
        
        if(sencored)
            await Message.remove({_id:sencored.id});
        else
            io.emit('message', req.body);
            res.sendStatus(200);
    
        } catch (error) {
            res.statusCode(500);
            return console.error(error)
        }
    })


// Connects every user
io.on("connection",()=>{
    console.log("connected successfully");
})

// connects to Database
mongoose.connect(dburl,{useNewUrlParser:true},(err)=>{
    console.log("mongo Connected" , err);
})

//Starts Up the server
 const server = http.listen(port,'localhost', socket =>{
     console.log('server running on port', server.address().port)
 });