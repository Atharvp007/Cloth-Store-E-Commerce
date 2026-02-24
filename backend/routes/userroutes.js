const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

module.exports = router;