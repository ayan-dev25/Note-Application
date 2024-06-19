import { User } from "../models/User.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }
    user.password = newPassword
    await user.save({ validateBeforesave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(200, req.user, "Current user fetched successfully")
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Account details updated succesfully.")
        )
});


const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({});
        res.status(201).json(
            new ApiResponse(200, users, "Users fetched successfully")
        )
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
}


export {
    changeCurrentPassword,
    updateAccountDetails,
    getCurrentUser,
    getAllUsers
}