import transporter from "../services/emailService.js";

export const sendWelcomeEmail = async (email, fullname) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,

      subject: "Welcome to IntelliCampus",

      html: `
         <h2>Hello ${fullname}<h2/>
         <p>Welcome to IntelliCampus.</p>
         <br/>
         <b>Thank You</b>
        `,
    });
    console.log("Welcome Email Sent");
  } catch (error) {
    console.log(error);
  }
};

export const sendTicketRaisedEmail = async (email, ticket) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "New Ticket Raised",
      html: `
    <h2>New Ticket</h2>

    <p><b>Title:</b> ${ticket.title}</p>

    <p><b>Category:</b> ${ticket.category}</p>

    <p><b>Priority:</b> ${ticket.priority}</p>

    `,
    });
    console.log("raised Email Sent");
  } catch (error) {
    console.log(error);
  }
};

export const sendResolvedEmail = async (email, ticket) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Ticket Resolved",
      html: `

<h2>Your Ticket Has Been Resolved</h2>

<p>${ticket.title}</p>

`,
    });
  console.log("resolved email Sent");
  } catch (error) {
    console.log(error);
  }
};