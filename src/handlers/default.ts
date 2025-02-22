import { ErrorRequestHandler } from "express";

export const defaultErrorHandler: ErrorRequestHandler = (
  _error,
  _req,
  res,
  _next
) => {
  console.error(_error);
  res.status(500).json({ message: "Something happened :(" });
};
