import { Note } from "../models/Note.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addNote = asyncHandler( async (req, res) => {
    const { title, content } = req.body;
    const owner = req.user?._id

    if(!title || !content || title.trim()==="" || content.trim()===""){
        throw new ApiError(400, "Title and Content of a note is required")
    }

    const newNote = await Note.create({
        title,
        content,
        owner,
        updatedBy: owner,
        sharedWith: []
    })

    console.log("newNote --->", newNote)
    if(!newNote){
        throw new ApiError(500, "Something went wrong while adding a note")
    }

    return res.status(201).json(
        new ApiResponse(200, newNote, "Note has been added sucessfully")
    )
});

const updateNote = asyncHandler( async (req, res) => {
    const {title, content } = req.body;
    const { note } = req.params;
    const updatedBy = req.user?._id

    //// validate user with sharedWith of any note

    if(!title || !content || title.trim()==="" || content.trim()===""){
        throw new ApiError(400, "Title and Content of a note is required")
    }

    const updatedNote = await Note.findByIdAndUpdate(
        note,
        {
            $set: {
                title,
                content,
                updatedBy
            }
        },
        { new: true }
    )

    if(!updatedNote){
        throw new ApiError(500, "Something went wrong while updating note details")
    }

    return res.status(201).json(
        new ApiResponse(200, updatedNote, "Note details updated Successfully")
    )
});

const deleteNote = asyncHandler( async (req, res) => {
    const { note } = req.params;
    const owner = req.user._id;
    const deletedNote = await Note.findOneAndDelete({ _id: note, owner });

    if (!deletedNote) {
        new ApiError(500, "Note not found or You has no access to delete note")
    }
    res.status(201).json(
        new ApiResponse(200, deletedNote, "Note deleted successfully")
    )
})

const getAllNotes = async (req, res) => {
    try {
        // Fetch all notes from the database
        const { owner } = req.user._id
        const notes = await Note.find({owner});
        res.status(201).json(
            new ApiResponse(200, notes, "Notes fetched successfully")
        )
      } catch (error) {
        console.error("Error fetching notes:", error);
        return [];
      }
}
const getNote = async (req, res) => {
    try {
        const { note } = req.params
        const notes = await Note.findById(note);
        res.status(201).json(
            new ApiResponse(200, notes, "Notes fetched successfully")
        )
      } catch (error) {
        console.error("Error fetching notes:", error);
        return [];
      }
}
export {addNote, updateNote, deleteNote, getAllNotes}