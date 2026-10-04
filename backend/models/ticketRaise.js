import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Hardware",
        "Software",
        "Network",
        "Library",
        "Accounts",
        "Examination",
        "Admission",
        "Other",
      ],
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    attachments: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],

    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["New", "In-Progress", "On-Hold", "Closed"],
      default: "New",
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  },
);

ticketSchema.index({ status: 1, category: 1 });

const Ticket = mongoose.model("TicketRaised", ticketSchema);

export default Ticket;
