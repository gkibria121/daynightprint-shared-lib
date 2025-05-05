import { z } from "zod";

export const productSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty("This field is required"),
});

export const bulkProductsSchema = z.object({
  products: z
    .array(productSchema.omit({ id: true }))
    .min(1, "At least one product is required"),
});
