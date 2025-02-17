import type { Request, Response } from "express"
import User from "../models/User"
import { AuthRequest } from "../middleware/authMiddleware"

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const { name, currentPassword, newPassword } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Update name 
    if (name) {
        user.name = name;
    }
    
    // Update password
    if (currentPassword && newPassword) {
        const isMatch = await user.comparePassword(currentPassword)
        if (!isMatch) {
          return res.status(400).json({ success: false, message: "Current password is incorrect" })
        }
        user.password = newPassword
    }
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

// Check for trainer 
export const getTrainer = async (req: Request, res: Response) => {
    try {
    const email = req.params.email
    const filter = {email: email}
    const user = await User.findOne(filter)
    
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    let trainer = false;
    if(user){
        trainer = user?.role === "trainer"
    }

    return res.send({trainer})

    } catch (error) {
      return  res.status(500).json({ success: false, message: "Server error", error })  
    }
}

export const checkAuth = async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req?.user?.id);
    const {_id, name, email, role} = user || {}
    res.json({_id, name, email, role });
}