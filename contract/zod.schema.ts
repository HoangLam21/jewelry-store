import { z } from "zod";

export const updateCustomerSchema = z.object({
    fullName: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
  });