import { Router } from "express";
import { messageController } from "./controllers/messageController";
import { webHookController } from "./controllers/webhookController";

const router: Router = Router();

router.put("/api/setWebHook", webHookController.setWebHook);
router.post("/api/sendText", messageController.sendText);
router.post("/api/sendImage", messageController.sendImage);

export { router };
