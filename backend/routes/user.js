const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware");
const { route } = require("./user");
const jwtKey = "paytmbruh"
const signupBody = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  try {
    console.log("sign up hit");
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Email already taken / wrong inputs",
      });
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser)
      return res.status(411).json({
        message: "User already Exists",
      });

    //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });

    const userId = user._id;

    await Account.create({
      user: userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign({ userId }, jwtKey);

    return res.status(200).json({
      message: "User created Successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while sign up, server error",
    });
  }
});

const signinBody = z.object({
  username: z.string(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  try {
    console.log("sign in ");
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect Inputs",
      });
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    // const passwordMatch = await bcrypt.compare(
    //   req.body.password,
    //   user.password
    // );
    if (user.password != req.body.password)
      return res.status(401).json({ message: "Password not correct" });

    const token = jwt.sign({ userId: user._id }, jwtKey);

    res.status(200).json({
      message: "logged In",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while loggin in, Server error",
    });
  }
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/user", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) return res.status(411).json({ message: "Wrong Input" });
  console.log(req.userId);
  await User.findByIdAndUpdate(req.userId, req.body);
  res.json({
    message: "Updated successfully",
  });
});

router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.status(200).json({
      message: "Account deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server error",
    });
  }
});
router.get("/info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const account = await Account.findOne({ user: req.userId });
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      balance: account.balance,
      id: req.userId,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/bulk", async (req, res) => {
  console.log("bulk");
  const filter = req.query.filter || "";

  console.log(filter);
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });
  console.log("MongoDB Query:", {
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  console.log(users);
  res.status(200).json({
    user: users.map((user) => ({
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      id: user._id,
    })),
  });
});

module.exports = router;
