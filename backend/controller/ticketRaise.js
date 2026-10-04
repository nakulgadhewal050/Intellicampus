import Ticket from "../models/ticketRaise.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const ticketRaise = async (req, res) => {

  try {
    const { title, category, priority, description } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const attachments = [];
    if (req.file) {
      let uploadFile;
      try {
        uploadFile = await uploadOnCloudinary(req.file);
      } catch (error) {
        return res.status(502).json({
          success: false,
          message: error.message || "Attachment upload failed",
        });
      }
      if (!uploadFile?.secure_url) {
        return res.status(502).json({
          success: false,
          message: "Attachment upload failed",
        });
      }
      attachments.push({
        url: uploadFile.secure_url,
        publicId: uploadFile.public_id,
      });
    }
    
    const ticket = await Ticket.create({
      title,
      category,
      priority,
      description,
      raisedBy: req.user._id,
      attachments,
    });
    res.status(201).json({
      success: true,
      message: "ticket registered successfully",
      ticket: {
        id: ticket._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ raisedBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate("raisedBy", "fullname email");

    return res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
