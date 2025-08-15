import z from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1, "Full Name is Required!"),
  otp: z.string().length(6, "OTP must be 6 digits").optional(),
  password: z.string().min(5, "Password Must be 5 Characters").optional()
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, "Password is Required!")
})