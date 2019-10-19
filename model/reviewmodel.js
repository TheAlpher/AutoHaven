const mongoose = require("mongoose");
const validator = require("validator");





const reviewSchema = new mongoose.Schema({
    fName: {
      type: String,
      required: true,
      validate: validator.isAlpha
    },
    lName: {
      type: String,
      required: true,
      validate: validator.isAlpha
    },
    email: {
      type: String,
      required: true,
      validate: validator.isEmail,
      unique: true
    },

    jobtitle: {
      type: String,
      required: true

    },

    reviewbody: {
      type: String,
      required: true
    
    },
    contact: {
      type: Number,
      required:true
    }

  });
  const reviewmodel=mongoose.model("Reviewmodel",reviewSchema);
  module.exports=reviewmodel;