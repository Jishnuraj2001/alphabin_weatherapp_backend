const mongoose=require("mongoose");

const preferredSchema=mongoose.Schema({
    city:String,
    icon:String,
    temp:String,
    time:String,
    description:String,
    userID:String
})

const Preferredmodel=mongoose.model("preferred",preferredSchema);

module.exports={
    Preferredmodel
}