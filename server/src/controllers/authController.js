
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Student
export const register = async (req, res) => {
  try {
    const { name, email, password, studentId, department } = req.body;

    // Basic validation
    if (!name || !email || !password || !studentId) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    if (req.body.role !== undefined) {
      return res.status(400).json({
        success: false,
        message: "Role cannot be selected during registration",
      });
    }

    if (typeof password !== "string" || password.length < 8 ||
      password.length > 72) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 72 characters",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        { studentId: studentId.trim() },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email or Student ID already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      studentId,
      department,
      role: "student",
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email or Student ID already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

// Login Admin or Student
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// Get logged-in user's profile
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      studentId: req.user.studentId,
      department: req.user.department,
    },
  });
};
