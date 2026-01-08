import Razorpay from "razorpay";
import crypto from "crypto";
import Course from "../models/Course.js";
import CourseStatus from "../models/CourseStatusModel.js";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../config.js";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// ---------------- CREATE ORDER ----------------
export const createOrder = async (req, res) => {
  try {
    const { categoryValue } = req.body;
    const { id: userId } = req.user;

    // Determine price
    let amount = 0;
    if (categoryValue === "autism-adhd") amount = 99 * 100;
    else if (categoryValue === "teenage") amount = 199 * 100;
    else if (categoryValue === "adults") amount = 299 * 100;

    // Short receipt to satisfy Razorpay limit (max 40 chars)
    const shortReceipt = `rcpt_${userId.toString().slice(-8)}_${Date.now() % 100000}`;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: shortReceipt,
      notes: { userId, categoryValue },
    });

    res.json(order);
  } catch (err) {
    console.error("❌ createOrder Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ---------------- VERIFY PAYMENT ----------------
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      categoryValue,
    } = req.body;

    const { id: userId } = req.user;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // 🔥 SAVE CATEGORY AS ACTIVE (PERMANENT)
    await CourseStatus.findOneAndUpdate(
      { userId, categoryValue },
      {
        status: "Active",
        paymentId: razorpay_payment_id,
      },
      { upsert: true, new: true }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Payment verification failed" });
  }
};

