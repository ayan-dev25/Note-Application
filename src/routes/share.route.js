import { Router } from "express"
import { shareNote } from "../controllers/share.controller.js"
import { checkNoteOwner } from "../middlewares/access.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/:note").put(verifyJWT,checkNoteOwner,shareNote)

export default router