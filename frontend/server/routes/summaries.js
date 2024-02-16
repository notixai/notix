const express = require("express");
const summariesRoutes = express.Router();

const mongoose = require('mongoose');
require("../model")
const Class = mongoose.model("classes")



module.exports = summariesRoutes;