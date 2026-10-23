import User from "../models/userModel.js";
import Ticket from "../models/ticketRaise.js";
import mongoose from "mongoose";
import { sendResolvedEmail } from "./emailController.js";

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

export const updateTicketByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["New", "In-Progress", "On-Hold", "Closed"];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket ID",
      });
    }

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket status",
      });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      {
        status,
        assignedTo: req.user._id,
        resolvedAt: status === "Closed" ? new Date() : null,
      },
      { new: true, runValidators: true },
    )
      .populate("raisedBy", "fullname email")
      .populate("assignedTo", "fullname email");

    if (!ticket) {
      return res.status(400).json({
        success: false,
        message: "Ticket not found",
      });
    }

    if (status === "Closed") {
      await sendResolvedEmail(ticket.raisedBy.email, ticket);
    }

    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    console.error("Admin ticket update failed", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update ticket",
    });
  }
};
