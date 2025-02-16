import type { Request, Response } from "express"
import User from "../models/User"

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const { name, email } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use" })
      }
    }

    user.name = name || user.name
    user.email = email || user.email

    await user.save()

    return res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error })
  }
}

export const userByEmail= async (req: Request, res: Response) => {
    try {
    const email = req.params.email
    const filter = {email: email}
    const user = await User.findOne(filter)
    
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" })
      }

      
    return res.json({
        success: true,
        message: "Profile updated successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error })
    }
}

export const getAdmin = async (req: Request, res: Response) => {
    try {
    const email = req.params.email
    const filter = {email: email}
    const user = await User.findOne(filter)
    
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    let admin = false;
    if(user){
        admin = user?.role === "admin"
    }

    return res.send({admin})

    } catch (error) {
      return  res.status(500).json({ success: false, message: "Server error", error })  
    }
}

