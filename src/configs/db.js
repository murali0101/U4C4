const mongoose=require("mongoose")

module.exports=()=>{
    return mongoose.connect("mongodb+srv://muralimv:1234@masaiassignments.vt3o0.mongodb.net/U4C4?retryWrites=true&w=majority")
}