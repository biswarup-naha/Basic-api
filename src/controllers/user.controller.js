import {User} from "../models/user.model.js";
import { createToken } from "../utils/token.js";

export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!(name && email && password && role)) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (User.find({ email })) {
        return res.status(400).json({ message: "Email already exists" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        user.password = undefined;
        const token = createToken(user);
        return res.status(201).json({ message: "User created successfully", user, token });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!(email && password)){
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordMatch = bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = createToken(user);
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in user" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "All users fetched successfully", users });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users" });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, email, password });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Error updating user" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user" });
    }
};