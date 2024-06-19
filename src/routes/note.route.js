import { Router } from "express"
import { addNote, deleteNote, getAllNotes, updateNote } from "../controllers/note.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/").get(getAllNotes).post(verifyJWT,addNote)

router.route("/:note").put(updateNote)
router.route("/:note").delete(deleteNote)

export default router