import { Note } from "../models/Note.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const shareNote = asyncHandler( async (req, res) => {
    const { sharedWith } = req.body;
    const { note } = req.params

    if(!sharedWith || !sharedWith.length){
        new ApiError(400, "Mails details are required to share the note")
    }

    const sharedNote = await Note.findById(note);
    if(!sharedNote){
        new ApiError(500, "Note not found")
    }

    if(sharedNote
        && sharedNote.sharedWith
    ){
        console.log(sharedWith)
            for (let index = 0; index < sharedWith.length; index++) {
                const element = sharedWith[index];
                if(!sharedNote.sharedWith.includes(element)){
                    sharedNote.sharedWith.push(element)
                }
            }

            const updatedSharedNote = await sharedNote.save();

            if(!updatedSharedNote){
                new ApiError(500, "Something went wrong while sharing note")
            }

            return res.status(201).json(
                new ApiResponse(200, {
                    sharedNote:updatedSharedNote,
                    sharedLink: `http://localhost:${process.env.PORT}/api/v1/notes/${updatedSharedNote?._id}/share`
                },"Note has been shared successfully")
            )
        }



})

export { shareNote }