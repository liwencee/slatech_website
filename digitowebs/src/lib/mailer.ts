import nodemailer from "nodemailer";

/**
 * Shared Nodemailer transporter using Hostinger SMTP.
 * Set these in your Hostinger env vars (Hosting → Manage → Node.js → Environment Variables):
 *   SMTP_HOST  = smtp.hostinger.com
 *   SMTP_PORT  = 465
 *   SMTP_USER  = info@slatech.com.ng
 *   SMTP_PASS  = <your email password>
 *
 * All three email routes (contact, chatbot-lead, newsletter) use this one transporter.
 * Everything sends FROM and TO info@slatech.com.ng.
 */
export const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || "smtp.hostinger.com",
  port:   Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL on port 465
  auth: {
    user: process.env.SMTP_USER || "info@slatech.com.ng",
    pass: process.env.SMTP_PASS || "",
  },
  // Prevents hanging forever if the SMTP server is unreachable — fail fast.
  connectionTimeout: 10_000,
  greetingTimeout:   10_000,
  socketTimeout:     15_000,
});

/** Returns true if SMTP credentials are configured. Useful guard before sendMail. */
export function mailerIsConfigured(): boolean {
  return Boolean(process.env.SMTP_PASS && process.env.SMTP_PASS.length > 0);
}
