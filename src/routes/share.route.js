import { Router } from "express"
import { shareNote } from "../controllers/share.controller.js"

const router = Router()

router.route("/:note/share").post(shareNote)

export default router