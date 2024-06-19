import mongoose, {Schema} from "mongoose";

const shareSchema = new Schema({
    sharedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
},{ timestamps: true })


export const Share = mongoose.model("Share", shareSchema)