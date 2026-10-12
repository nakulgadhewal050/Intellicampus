import User from "../models/userModel.js";
import Ticket from "../models/ticketRaise.js";

export const getAdminDashboard = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Admin dashboard accessed successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error loading admin dashboard",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }
    const users = await User.find().select("-password");
    return res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .populate("raisedBy", "fullname email")
      .populate("assignedTo", "fullname email");

    return res.status(200).json({
      success: true,
      totalTickets: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
