import connectDB from "@/lib/db";
import messageModel from "@/app/models/messages/message";
import { NextResponse as res } from "next/server";
import mongoose from "mongoose";

// api to add message from user
export async function POST(req)
{
    try
    {
        await connectDB();

        const { fullName, email, message } = await req.json();

        if(fullName.trim() === "" || email.trim() === "" || message.trim() === "")
        {
            return res.json({
                success : false,
                message : "All fields are required"
            },{ status : 400});
        }

        await messageModel.create({
            fullName, email, message
        });

        return res.json({
            success : true,
            message : "Message sent successfully"
        },{ status : 200});
    }
    catch(error)
    {
        return res.json({
            success : false,
            message : error.message
        },{ status : 500});
    }
}

// api to fetch messages
export async function GET(req)
{
    try
    {
        await connectDB();

        const messages = await messageModel.find({});

        return res.json({
            success : true,
            messages
        },{ status : 200});
    }
    catch(error)
    {
        return res.json({
            success : false,
            message : error.message
        },{ status : 500});
    }
}