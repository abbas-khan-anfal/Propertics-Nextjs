import mongoose from "mongoose";
import messageModel from "@/app/models/messages/message";
import { NextResponse as res } from "next/server";
import connectDB from "@/lib/db";

// api to delete message
export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { p_id } = params;

        // Check if p_id is a valid MongoDB ObjectId
        if (!p_id || !mongoose.Types.ObjectId.isValid(p_id)) {
            return res.json({
                success: false,
                message: "Invalid or missing message ID"
            }, { status: 400 });
        }

        const deletedMessage = await messageModel.findByIdAndDelete(p_id);

        if (!deletedMessage) {
            return res.json({
                success: false,
                message: "Message not found"
            }, { status: 404 });
        }

        return res.json({
            success: true,
            message: "Message deleted successfully"
        }, { status: 200 });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}
