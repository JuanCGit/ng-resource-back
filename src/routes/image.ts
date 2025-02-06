import { Router } from "express";
import { getImage } from "../controllers/image";

const router = Router();

router.get("/", getImage);

export const imageRouter = router;
