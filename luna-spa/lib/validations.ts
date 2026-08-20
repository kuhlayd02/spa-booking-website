import { z } from "zod";

export const bookingSchema = z.object({
  customerName: z.string().min(2, "Please enter your full name."),
  customerEmail: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."),
  customerPhone: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .max(20, "That phone number looks too long."),
  serviceId: z.string().min(1, "Please choose a service."),
  staffId: z.string().min(1, "Please choose a therapist."),
  date: z.string().min(1, "Please pick a date."),
  time: z.string().min(1, "Please pick a time slot."),
  paymentMethod: z.enum(["CASH", "GCASH", "CARD"]),
  notes: z.string().max(500, "Please keep notes under 500 characters.").optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;