import mongoose, { Schema } from "mongoose";

const sharedWithSchema = new Schema({
    email: {
        type: String,
        required: [true,"Email is required"]
    },
    access: {
        type: String,
        enum: ['Editor', 'Viewer'],
        default: "Viewer",
    }
})

const noteSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true,"Title is required"]
    },
    content: {
        type: String,
        trim: true,
        required: [true,"Content is required"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    sharedWith: [sharedWithSchema],
}, { timestamps: true })


export const Note = mongoose.model("Note", noteSchema)