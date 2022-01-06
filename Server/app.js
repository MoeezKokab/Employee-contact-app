const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
require('./Employee')
app.use(bodyParser.json())

const Employee = mongoose.model("employee")

const dburl = "mongodb+srv://moeez:moeez@cluster0.kr34z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

mongoose.connection.on("connected", () => {
    console.log("connected to mognes")
})

mongoose.connection.on("err", (err) => {
    console.log("err", err)
})

app.get('/', (req, res) => {
    Employee.find({}).then( data=>
        res.send(data)
    ).catch(err=>{
        console.log(err)
    })

})


app.post("/send-data", (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        mail: req.body.mail,
        phone: req.body.phone,
        photo: req.body.photo,
        salary: req.body.salary,
        position: req.body.position,
        gender: req.body.gender
    })
    employee.save()
        .then((data) => {
            console.log(data)
            res.send(data)
        }).catch(err => {
            console.log(err)
        })

   { /* // console.log(data)
   // res.send("posted")*/}
    
})


app.post('/update', (req, res) => {
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        mail:req.body.mail,
        phone:req.body.phone,
        photo:req.body.photo,
        salary: req.body.salary ,
        position: req.body.position,
        gender: req.body.gender
    }).then(data => {
        console.log(data)
        res.send(data)
    }
    ).catch(err => {
        console.log(err)
    })
})

app.post('/delete', (req, res) => {
    Employee.findByIdAndDelete(req.body.id)
        .then(data => {
            console.log(data)
            res.send(data)
        }
        ).catch(err => {
            console.log(err)
        })
})

app.listen(3000, () => {
    console.log("SServer")
})