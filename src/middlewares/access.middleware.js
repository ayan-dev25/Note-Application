import { Note } from "../models/Note.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const checkNoteOwner = asyncHandler( async (req, res, next) => {
    try {
        const { note } = req.params;
        const userId = req.user?._id;
        console.log(req.user);
        const checkedNote = await Note.findById(note);
        if (!checkedNote) {
            new ApiError(404, "No Note Found!");
        }
        console.log(checkedNote)
        console.log(checkedNote.owner.toString())
        if (checkedNote && checkedNote.owner.toString() == userId) {
            console.log("checked")
            next();
        } else {
            new ApiError(401, "Invalid Access Token")
        }
    } catch (error) {
        new ApiError(401, error?.message || "Invalid access Token")
    }
})

const checkNoteOwnerOrShareUser = asyncHandler( async (req, res, next) => {
    try {
        const { note } = req.params;
        const loggedInUser = req.user?._id;
        console.log(req.user);
        const checkedNote = await Note.findById(note);
        if (!checkedNote) {
            throw new ApiError(404, "No Note Found!");
        }
        console.log(checkedNote)

        const owner = checkedNote.owner;

        if (checkedNote && owner.toString() == loggedInUser) {
            console.log("owner checked")
            next();
        }
        if (checkedNote && owner.toString() != loggedInUser) {
            let sharedUserEmailArr = [];
            console.log("not owner checked")
            console.log(checkedNote?.sharedWith.length)
            if(!checkedNote?.sharedWith.length){
                throw new ApiError(401, "Invalid Access Token");
            }

            for (let p = 0; p < checkedNote?.sharedWith.length; p++) {
                const email = checkedNote.sharedWith[p]?.email
                console.log(email)
                sharedUserEmailArr.push(email);
            }
            console.log(sharedUserEmailArr);
            let sharedUserIdArr = [];

            for (let k = 0; k < sharedUserEmailArr?.length; k++) {
                let user = await User.findOne({ email: sharedUserEmailArr[k] })
                if (user) {
                    sharedUserIdArr.push(user._id.toString())
                }
            }
            console.log(sharedUserIdArr);
            console.log(loggedInUser);
            
            if(sharedUserIdArr.length > 0 && sharedUserIdArr.includes(loggedInUser.toString())){
                console.log("shared user checked")
                next();
            }else {
                throw new ApiError(401, "Invalid Access Token")
            }
        }
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access Token")
    }
})

export { checkNoteOwner , checkNoteOwnerOrShareUser}