const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const multer = require("multer");
const path = require("path");

const { uploadProfile} = require("../middlewares/upload");
const cloudinary = require("../services/cloudinary");

const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;
  } catch (error) {
    console.log("Error uploading image to Cloudinary: ", error);
    throw new Error("Error uploading image");
  }
};

const signUpController = async (req, res) => {
  const { name, email, password, address } = req.body;
  const profilePicture = req.file ? await uploadImageToCloudinary(req.file.path) : null;
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  

  try {
    const exists = await UserModel.findOne({ email });
    if (exists) return res.json({ success: false, message: "User already exists" });
    if (!validator.isEmail(email)) return res.json({ success: false, message: "Please enter a valid email" });
    if (password.length < 6) return res.json({ success: false, message: "Password must be at least 6 characters" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      profilePicture: profilePicture,
      name,
      email,
      password: hashedPassword,
      address,
    });

    return res.json({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, address } = req.body;
  const profilePicture = req.file ? req.file.path : undefined;

  try {
    let updateData = { name, email, address };
    if (profilePicture) updateData.profilePicture = profilePicture;
    if (password) {
      if (password.length < 6) return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,       // Set this to true if using HTTPS
    sameSite: "None",    // Needed for cross-origin requests
  });
  res.status(200).json({ message: "Logout successful" });
};


const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ success: true, message: "Users fetched successfully", users });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  signUpController,
  loginController,
  deleteUserController,
  updateUserController,
  getAllUsers,
  logoutUser
};
