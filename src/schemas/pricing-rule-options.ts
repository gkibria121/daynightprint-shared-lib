import { z } from "zod";

export type PricingRuleOptionType = {
  attribute: string;
  default: number;
  values: string[];
  inputType: HTMLInputElement["type"];
  required: boolean;
  description: string;
  hasOther: boolean;
};

export const pricingRuleOptionSchema = z.object({
  attribute: z.string(),
  default: z.number(),
  values: z.array(z.string()),
  inputType: z.string(),
  required: z.boolean().optional(),
  description: z.string().optional(),
  hasOther: z.boolean().optional(),
});
