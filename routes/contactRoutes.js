import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: "Message submitted successfully", contactId: contact._id });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ message: error.message || "Unable to submit message" });
  }
});

export default router;