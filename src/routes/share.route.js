import { Router } from "express"
import { removeSharedNoteAccess, shareNote } from "../controllers/share.controller.js"
import { checkNoteOwner } from "../middlewares/access.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/:note").put(verifyJWT,checkNoteOwner,shareNote)
router.route("/:note/remove-access").put(verifyJWT,checkNoteOwner,removeSharedNoteAccess)
export default router