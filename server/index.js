const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080

//schema

const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : String
},{
    timestamps : true
})

const userModel = mongoose.model("user",schemaData)


mongoose.connect("mongodb+srv://yashkulkarni0987:dltoHfI2ECfXiPYg@cluster0.e7hidzh.mongodb.net/")
.then(() => console.log("connected to db"))
.catch((err)=> console.log(error))

// read data
app.get("/",async(req,res)=> {
    const data = await userModel.find({})
    res.json({success: true, data:data})
})

// create data

app.post("/create",async(req,res) => {
    console.log(req.body)
    const data =new  userModel(req.body)
    await data.save()
    res.send({success: true,message:"data saved successfully", data:data})
})

//update data   

app.put("/update",async(req,res) =>{
    console.log(req.body)
    const { _id, ...rest } = req.body;
    const data = await userModel.updateOne({ _id: new mongoose.Types.ObjectId(_id) }, rest);
    res.send({success: true, message:"data updated successfully", data:data})
    // const id = req.body
})

//delete api

app.delete("/delete/:id", async(req,res) =>{
    const id = req.params.id
    console.log(id)

    const data = await userModel.deleteOne({_id:id})
    res.send({success: true, message:"data deleted successfully", data:data})

})



app.listen(PORT,()=>console.log("Server is running"))