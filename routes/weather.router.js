
const express=require("express");
const fetch=require("isomorphic-fetch");
require("dotenv").config();
const weatherRouter=express.Router();

const{authenticator}=require("../middlewares/authenticator.middleware");
const{Preferredmodel}=require("../models/preferred.model");

weatherRouter.get("/current",async(req,res)=>{
    const city=req.query.city;
    try {
        const ress=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.apikey}`);
        const data=await ress.json();
        res.status(200).json({"msg":"got current weather successfully","data":data});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"msg":"somthing went wrong while fetching current weather"});
    }
})

weatherRouter.get("/forecast",async(req,res)=>{
    const city=req.query.city;
    try {
        const ress=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.apikey}`);
        const data=await ress.json();
        res.status(200).json({"msg":"got forecast weather successfully","data":data});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"msg":"somthing went wrong while fetching forecast weather"});
    }
})


weatherRouter.post("/preferred",authenticator,async(req,res)=>{
    try {
        let data=new Preferredmodel(req.body);
        await data.save();
        res.status(201).json({"msg":"data added to preferred successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"msg":"somthing went wrong while posting preferred weather"});
    }
})

weatherRouter.get("/preferred",authenticator,async(req,res)=>{
    const id=req.body.userID;
    try {
        const data=await Preferredmodel.find({userID:id});
        res.status(200).json({"msg":"got preferred weather successfully","data":data});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"msg":"somthing went wrong while fetching preferred weather"});
    }
})

module.exports={
    weatherRouter
}
