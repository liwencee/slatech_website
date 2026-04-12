import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100)
    .trim(),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(20).optional(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200)
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000)
    .trim(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
