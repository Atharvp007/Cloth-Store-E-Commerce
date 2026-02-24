const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const protect=require("../middleware/authMiddleware");
const router = express.Router();

// POST /api/users/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // ✅ Input validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all fields" });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "User already exists" });

    // Create user
    user = new User({ name, email, password });
    await user.save();

    // ✅ Create JWT Payload (FROM IMAGE)
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // ✅ Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;