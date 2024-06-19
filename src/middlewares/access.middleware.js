import { Note } from "../models/Note.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const checkNoteOwner = async (req,res, next) => {
    try {
        const { note } = req.params;
        const userId = req.user?._id;
        console.log(req.user);
        const checkedNote = await Note.findById(note);
        if(!checkedNote){
            new ApiError(404,"No Note Found!");
        }
        console.log(checkedNote)
        console.log(checkedNote.owner.toString())
        if(checkedNote && checkedNote.owner.toString() == userId){
            console.log("checked")
            next();
        }else{
            new ApiError(401, "Invalid Access Token")
        }
    } catch (error) {
        new ApiError(401, error?.message || "Invalid access Token")
    }
}

export {checkNoteOwner}