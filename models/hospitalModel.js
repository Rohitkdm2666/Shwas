const e = require("express");
const express = require("express");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    email: String,
    phone1: String,
    phone2: String,
    address: String,
    patientCapacity: Number,
    openAt: String,
    closeAt: String,
    gstNumber: String,
    registerNumber: String,
    established: Date,
    status: {
        type: String, enum: ["active", "inactive"], default: "active"},
}, { timestamps: true });

const Hospital = mongoose.model("Hospital", schema);
module.exports = Hospital;

