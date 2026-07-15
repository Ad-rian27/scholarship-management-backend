const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://adrian:adrian123@cluster0.veegpvo.mongodb.net/acholmgmtdb").then(
    () => {
        console.log("MongoDB Scholarship Management connected")
    }
).catch(
    (err) => (
        console.log(err)
))

const Student=mongoose.model("Students", new mongoose.Schema(
    {
        stuID: String,
        stuName: String,
        regNo: String,
        dept: String,
        course: String,
        yos: String,
        email: String,
        phone: String
    }
))

const Scholarship=mongoose.model("Scholarships", new mongoose.Schema(
    {
        scholID: String,
        scholName: String,
        scholType: String,
        eligpa: String,
        maxfaminc: String,
        acholAmt: String,
        lastDate: String,
        desc: String,
    }
))

const Application=mongoose.model("Applications", new mongoose.Schema(
    {
        appID: String,
        stuID: String,
        scholID: String,
        appDate: String,
        cgpa: String,
        faminc: String,
        status: String,
        refNo: String
    }
))

app.post("/view-app", async (req, res) => {
    const applications=await Application.find()
    res.json(applications)
}) 
  
app.post("/add-app", async (req,res) => {
    await Application.create(req.body)
    res.json({"status" : "success"})
})


app.listen(3000,() => {
    console.log("Server started")
})