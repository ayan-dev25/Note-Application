import { Router } from "express"
import { addNote, deleteNote, getAllNotes, getNote, updateNote } from "../controllers/note.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { checkNoteOwnerOrShareUser } from "../middlewares/access.middleware.js"

const router = Router()

router.route("/").get(getAllNotes).post(verifyJWT,addNote)
router.route("/:note").put(updateNote)
router.route("/:note").delete(deleteNote)

router.route("/:note/share").get(verifyJWT, checkNoteOwnerOrShareUser, getNote)
export default router