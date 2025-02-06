import e, { RequestHandler, request } from "express";
import { imagePromptValidator } from "../validators/image.validator";

export const getImage: RequestHandler = async (req, res) => {
  const validatedPrompt = imagePromptValidator.parse(req.body);
  const image = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(validatedPrompt),
  }).then((resp) => resp.json());
  res.status(200).json(image);
};
