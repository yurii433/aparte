import { Request, Response } from "express";
import User from "../models/userModel";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const user_signup = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Both email and password are required" });
    }

    const existingUser = await User.find({ email: req.body.email });
    if (existingUser.length >= 1) {
      return res
        .status(400)

        .json({ message: "GUser with this email already exists" });
    }

    const { email, password } = req.body;
    const user = await User.create({ email, password });

    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: (err as Error).message });
  }
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id: any) => {
  return jwt.sign({ id }, "it`s a secret!", {
    expiresIn: maxAge,
  });
};

const usersGetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json({ message: "No users found" });
    }
    console.log("test");
    res.status(200).json({ count: users.length, users: users });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
};

const usersGetUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(500).json({ message: "Not valid User ID" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(500).json({ message: "ID not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const usersDeleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: "User ID not valid" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User ID not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User successfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const usersPatchUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "User ID not valid" });
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ message: "No user with provided ID found" });
    }

    await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "apartment information updated",
      user: user,
      update: req.body,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "failed", message: (err as Error).message });
  }
};

export {
  usersGetAllUsers,
  usersGetUser,
  usersDeleteUser,
  usersPatchUser,
  user_signup,
};
