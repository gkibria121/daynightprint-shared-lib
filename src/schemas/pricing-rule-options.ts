import { z } from "zod";

export const pricingRuleOptionSchema = z.object({
  attribute: z
    .string()
    .min(1, {
      message: "Attribute name is required and cannot be empty.",
    })
    .describe("A unique identifier for the pricing rule attribute."),

  default: z
    .number({
      required_error: "Default value is required.",
      invalid_type_error: "Default must be a valid number.",
    })
    .describe("The default numeric value for this pricing option."),

  values: z
    .array(
      z.string().min(1, {
        message: "Each value must be a non-empty string.",
      }),
      {
        invalid_type_error: "Values must be an array of strings.",
      }
    )
    .nonempty({
      message: "At least one value must be provided.",
    })
    .describe("A list of allowed string values for selection."),

  inputType: z
    .string()
    .min(1, {
      message: "Input type is required.",
    })
    .describe(
      "The type of input used to capture user selection (e.g., dropdown, text)."
    ),

  required: z.boolean().optional().describe("Whether this field is mandatory."),

  description: z
    .string()
    .optional()
    .describe("A short explanation of this pricing option."),

  hasOther: z
    .boolean()
    .optional()
    .describe("If true, allows 'Other' as a selectable input."),
});
