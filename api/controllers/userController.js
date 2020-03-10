"use strict"
const user = require('../models/userModel');
const mongoose = require("mongoose");

exports.register = async (req, res) => {
    console.log("REQUEST-----------------",req.body);
    if (req.body.email === "undefined"
        || req.body.password === "undefined"
        || req.body.firstName === "undefined"
        || req.body.lastName === "undefined"
        || req.body.phoneNumber === "undefined") {
        res.status(422).json({ msg: "Invalid data" });
        return;
    }
    let { email, password, firstName, lastName, phoneNumber, is_admin } = req.body;
    if (email.indexOf("@") === -1 && email.indexOf(".") === -1
        || password.length < 6) {
        res.status(422).json({ msg: "Invalid data" });
        return;
    }
    let userFind = false
    try {
        
        userFind = await user.exists({ email: email });


    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }

    if (userFind) {
        res.status(409).json({ msg: "Email already exist" });
        return;
    }
    const newUser = new user({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        is_admin: is_admin || false
    });

    try {
        await newUser.save();
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
    res.status(201).json({ msg: "success" });
}

exports.login = async (req, res) => {
    if (req.body.email === "undefined" || req.body.password === "undefined") {
        res.status(402).json({ msg: "Invalid data" });
        return;
    }
    let { email, password } = req.body;
    let userFind = null;
    try {
        userFind = await user.findOne({ email: email });
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
    if (userFind == null) {
        res.status(422).json({ msg: "Invalid data" });
        return
    }
    if (userFind.password !== password) {
        res.status(422).json({ msg: "Invalid data" });
        return;
    }
    res.status(200).json({
        smg: "success",
        user: {
            email: userFind.email,
            password: userFind.password,
            firstName: userFind.firstName,
            lastName: userFind.lastName,
            phoneNumber: userFind.phoneNumber,
            id: userFind._id
        }
    })
}