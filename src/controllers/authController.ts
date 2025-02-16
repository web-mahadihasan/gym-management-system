import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User, { type IUser } from "../models/User"
import dotenv from "dotenv"
dotenv.config()

const generateToken = (user: IUser) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables")
      }
    
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })
}

export const register = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body
  
      const userExists = await User.findOne({ email })
      if (userExists) {
        return res.status(400).json({ success: false, message: "User already exists" })
      }
  
      const user = await User.create({ name, email, password, role })
      const token = generateToken(user)
  
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        },
      })
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
  
      const user = await User.findOne({ email })
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ success: false, message: "Invalid email or password" })
      }
  
      const token = generateToken(user)
  
      return res.json({
        success: true,
        message: "Login successful",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        },
      })
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error })
    }
}
  
  


