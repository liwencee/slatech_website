import nodemailer from "nodemailer";

/**
 * Shared Nodemailer transporter using Hostinger SMTP.
 * Set these in your Hostinger env vars:
 *   SMTP_HOST  = smtp.hostinger.com
 *   SMTP_PORT  = 465
 *   SMTP_USER  = info@slatech.com.ng
 *   SMTP_PASS  = <your email password>
 */
export const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST  || "smtp.hostinger.com",
  port:   Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL on port 465
  auth: {
    user: process.env.SMTP_USER || "info@slatech.com.ng",
    pass: process.env.SMTP_PASS || "",
  },
});
