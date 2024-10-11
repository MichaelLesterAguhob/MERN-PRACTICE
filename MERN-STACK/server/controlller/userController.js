import { get } from "mongoose";
import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const saveData = await newUser.save();
    // res.status(200).json(saveData);
    res.status(200).json({message: "User created successfully."});
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userID = req.params.id;
    const userExist = await User.findById(userID);

    if (!userExist || userExist.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const userID = req.params.id;
    const userExist = await User.findById(userID);

    if (!userExist || userExist.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData = await User.findByIdAndUpdate(userID, req.body, {
      new: true,
    });

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist || userExist.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully"});

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
