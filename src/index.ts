import express, { json } from "express";
import { imageRouter } from "./routes/image";
import { defaultErrorHandler } from "./handlers/default";
import { notFoundErrorHandler } from "./handlers/route";
import { zodErrorHandler } from "./handlers/zod";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
app.use(json());
app.use(cors());

app.use("/image", imageRouter);

app.use(notFoundErrorHandler);
app.use(zodErrorHandler);
app.use(defaultErrorHandler);

app.listen(3000, () => console.info("NG-Resource Back has started!"));
