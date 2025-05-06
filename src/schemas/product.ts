import { z } from "zod";

export const productSchema = z.object({
  id: z.string().nonempty(),
  name: z.string({ required_error: "This field is required" }),
});

export const bulkProductsSchema = z
  .object({
    products: z
      .array(productSchema.omit({ id: true }))
      .min(1, "At least one product is required"),
  })
  .refine(
    (data) => {
      const names = data.products.map((p) => p.name);
      const uniqueNames = new Set(names);
      return names.length === uniqueNames.size;
    },
    {
      message: "Product names must be unique",
      path: ["products"],
    }
  );
