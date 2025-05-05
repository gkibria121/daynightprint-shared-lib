import { z } from "zod";
import { productSchema } from "./product";
import { vendorSchema } from "./vendor";

// Delivery Slot Schema with validation messages
export const deliverySlotSchem = z.object({
  label: z
    .string({
      required_error: "Label is required",
    })
    .nonempty("Label is required"),

  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0, "Price must be a positive number"),

  deliveryTimeStartDate: z
    .number({
      required_error: "Start date is required",
      invalid_type_error: "Start date must be a number",
    })
    .min(0, "Invalid start date"),

  deliveryTimeStartTime: z
    .string({
      required_error: "Start time is required",
    })
    .regex(/^\d{1,2}:\d{2}$/, {
      message: "Invalid time format (expected HH:MM)",
    }),

  deliveryTimeEndDate: z
    .number({
      required_error: "End date is required",
      invalid_type_error: "End date must be a number",
    })
    .min(0, "Invalid end date"),

  deliveryTimeEndTime: z
    .string({
      required_error: "End time is required",
    })
    .regex(/^\d{1,2}:\d{2}$/, {
      message: "Invalid time format (expected HH:MM)",
    }),

  cutoffTime: z
    .string({
      required_error: "Cutoff time is required",
    })
    .regex(/^\d{1,2}:\d{2}$/, {
      message: "Invalid time format (expected HH:MM)",
    }),
});

// Quantity Pricing Schema with validation messages
export const quantityPricingSchema = z.object({
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .min(1, "Quantity must be greater than 0"),

  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0, "Price must be a positive number"),
});

// Pricing Rule Schema with validation messages
export const pricingRuleSchema = z.object({
  attribute: z
    .string({
      required_error: "Attribute is required",
    })
    .nonempty("Attribute is required"),

  value: z
    .string({
      required_error: "Value is required",
    })
    .nonempty("Value is required"),

  price: z.union([
    z
      .string({ required_error: "Price is required" })
      .nonempty("Price is required"),
    z.number({ invalid_type_error: "Price must be a number" }),
  ]),
});

// Vendor Product Schema with validation messages
export const vendorProductSchema = z.object({
  product: productSchema,
  vendor: vendorSchema,
  id: z.string().nonempty("ID is required"),

  pricingRules: z
    .array(pricingRuleSchema)
    .min(1, { message: "At least one pricing rule is required" }),

  deliverySlots: z
    .array(deliverySlotSchem)
    .min(1, { message: "At least one delivery slot is required" }),

  quantityPricings: z
    .array(quantityPricingSchema)
    .min(1, { message: "At least one quantity pricing is required" }),
});
// Vendor Product Form Schema with validation messages
export const VendorProductFormSchema = z.object({
  vendorProducts: z.array(
    vendorProductSchema.omit({ product: true, vendor: true, id: true }).extend({
      vendorId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),
      productId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),
    })
  ),
});
