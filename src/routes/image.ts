import { Router } from "express";
import { getImage } from "../controllers/image";

const router = Router();

router.post("/", getImage);

export const imageRouter = router;
