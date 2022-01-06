const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
    name:String,
    mail:String,
    phone:String,
    photo:String,
    salary:String,
    position:String,
    gender:String
})

mongoose.model("employee",EmployeeSchema)