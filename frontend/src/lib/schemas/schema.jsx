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

export const contactSchema = z.object({
  fullName: z.string().min(1, "Full Name is Required!"),
  email: z.string().email(),
  inquiry: z.string().min(1, "Inquiry is Required!")
})

export const reviewSchema = z.object({
  review: z.string().min(1, "Review Required!")
})

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6, "OTP Must Be 6 Digits").optional(),
  password: z.string().min(5, "Atleast 5 Characters Are Required!").optional(),
  confirmPassword: z.string().optional(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const BillingSchema = z.object({
  billingAddress: z.string().min(5, "Billing Address is Required!"),
  shippingAddress: z.string().min(5, "Shipping Address is Required!"),
  items: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      totalUSD: z.number(),
      weight: z.number(),
      qty: z.number()
    })
  ).optional()
})

export const ProductSchema = z.object({
  name: z.string().min(1, "Product Name is Required!"),
  functionType: z.string().min(1, "Function Type is Required!"),
  price: z.object({
    perUnit: z.coerce.number().min(1, "Price Per Unit is Required!"),
    perGram: z.coerce.number().min(1, "Price Per Gram is Required!"),
  }),
  stock: z.coerce.number().min(0),
  status: z.enum(["Active", "Inactive", "Out Of Stock"]),

   paymentMethod: z
    .union([
      z.string().transform((val) =>
        val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      ),
      z.array(z.string()),
    ])
    .transform((val) => (Array.isArray(val) ? val : val))
    .refine((arr) => arr.length > 0, {
      message: "At least one payment method is required",
    }),

  specifications: z.object({
    ProductGlance: z.object({
      modelName: z.string().min(1, "Model Name is required"),
      hashRate: z.string().min(1, "Hash Rate is required"),
      powerConsumption: z.string().min(1, "Power Consumption is required"),
      algorithm: z.string().min(1, "Algorithm is required"),
      phase: z.string().min(1, "Phase is required"),
      maxCurrent: z.string().min(1, "Max Current is required"),
      inputVoltage: z.string().min(1, "Input Voltage is required"),
      inputFrequency: z.string().min(1, "Input Frequency is required"),
    }),
    HardwareConfiguration: z.object({
      networkConnectionMode: z.string().min(1, "Network connection is required"),
      serverSizeWithoutPackage: z.string().min(1, "Required"),
      serverSizeWithPackage: z.string().min(1, "Required"),
      netWeight: z.string().min(1, "Net Weight required"),
      grossWeight: z.string().min(1, "Gross Weight required"),
    }),
    EnvironmentRequirements: z.object({
      siteCoolantTemperature: z.string().min(1, "Required"),
      coolantFlow: z.string().min(1, "Required"),
      coolantPressure: z.string().min(1, "Required"),
      workingCoolant: z.string().min(1, "Required"),
      diameterOfCoolantPipeConnector: z.string().min(1, "Required"),
    }),
  }),

  purchasingGuidelines: z.array(z.string().min(1, "Cannot be empty")).optional(),
  images: z.array(z.string()).optional(),
});