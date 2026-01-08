// backend/config.js
import dotenv from "dotenv";
dotenv.config();

export const {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET,
  MONGODB_URI,
  JWT_SECRET,
  CLIENT_URL
} = process.env;

// Fail-safe
if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys missing in .env!");
}
