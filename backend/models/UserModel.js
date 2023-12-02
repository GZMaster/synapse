const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// Create a new Mongoose schema for the user model
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please tell us your first name!"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Please tell us your last name!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address!"],
  },
  Gender: {
    type: String,
    required: [true, "Please tell us your gender!"],
    enum: ["male", "female", "other"],
    trim: true,
  },
  Age: {
    type: Number,
    required: [true, "Please tell us your age!"],
    min: 10,
  },
  Country: {
    type: String,
    required: [true, "Please tell us your country!"],
  },
  IQ_Score: {
    type: Number,
    required: [true, "Please tell us your IQ score!"],
    min: 0,
  },
  Course_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  Cohort: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cohort",
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      // This only works on CREATE and SAVE!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  otp: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Encrypt the user password before saving the user to the database
userSchema.pre("save", async function (next) {
  // Only run this function if the password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Compare the provided password with the user's password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return tokenIssuedAt < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

// Create a new Mongoose model for the user model
const User = mongoose.model("User", userSchema);

// Export the user model
module.exports = User;
