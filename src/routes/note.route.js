import { Router } from "express"
import { addNote, deleteNote, getAllNotes, updateNote } from "../controllers/note.controller.js"

const router = Router()

router.route("/").get(getAllNotes).post(addNote)

router.route("/:note").put(updateNote)
router.route("/:note").delete(deleteNote)

export default router