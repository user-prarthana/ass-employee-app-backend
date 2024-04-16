// Task1: initiate app and run server at 3000
const express =require('express');

const app = express();
const postMod=require('./model/post')
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://prarthana:prarthana@cluster0.gqozafg.mongodb.net/assinirm?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to DB")
})
.catch((err)=>{
    console.log(err)
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
app.use(express.json());








//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async(req,res)=>{
    try {
        full_list = await postMod.find();
        res.send(full_list)
    } catch (error) {
        console.log(error)
    }
})



//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',async(req,res)=>{
    try {
        const id =req.params.id;
        specified_data = await postMod.findbyid(id)
        if(specified_data){
            res.send({message:"item founded",specified_data})
        }else{
            res.send({message:"item not founded"})
        }
    } catch (error) {
        console.log(error)
    }
})





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}



app.post('/api/employeelist',async(req,res)=>{
    try {
        const data = req.body;
        await postMod(data).save();
        res.send({message:"Data added"})
    } catch (error) {
        console.log(error)
    }
})






//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const index=await postMod.findByIdAndDelete(id);
        res.send({message:"item deleted"})
    } catch (error) {
        console.log(error)
    }
})





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
 
app.listen(3000,()=>{
    console.log("running in 3000")
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



