import { z } from "zod";

const dallE2Sizes = ["256x256", "512x512", "1024x1024"] as const;
const dallE3Sizes = ["1024x1024", "1792x1024", "1024x1792"] as const;

const baseSchema = z.object({
  prompt: z.string().min(3, "The prompt must be at least 3 characters."),
  model: z.enum(["dall-e-2", "dall-e-3"]),
  size: z.string(),
  n: z
    .number()
    .int()
    .refine((val) => val === 1, {
      message: "Only one image can be generated.",
    }),
});

export const imagePromptValidator = baseSchema.superRefine((data, ctx) => {
  if (data.model === "dall-e-2") {
    if (!dallE2Sizes.includes(data.size as any)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Invalid size for model dall-e-2. Allowed sizes: 256x256, 512x512, 1024x1024.",
        path: ["size"],
      });
    }
  } else if (data.model === "dall-e-3") {
    if (!dallE3Sizes.includes(data.size as any)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Invalid size for model dall-e-3. Allowed sizes: 1024x1024, 1792x1024, 1024x1792.",
        path: ["size"],
      });
    }
  }
});
