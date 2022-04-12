import { Router } from "express";
import { messageController } from "./controllers/messageController";

const router: Router = Router();

router.post("/sendText", messageController.sendText);
router.post("/sendImage", messageController.sendImage);

export { router };
