import mongoose from "mongoose";
import userModel from "@/app/models/auth/user";
import connectDB from "@/lib/db";
import { NextResponse as res } from "next/server";
import { cookies } from "next/headers";
import { getLoggedInUser } from "@/lib/getLoggedInUser";

// api to get the current logged in user
export async function GET(req)
{
    try
    {
        await connectDB();
        // get user if user is logged in
       const user = await getLoggedInUser();

       if(!mongoose.isValidObjectId(user.userId))
       {
        return res.json({
            success : false,
            message : "User does not found"
        },{ status : 404});
       }

        const userRef = await userModel.findById(user.userId);



        return res.json({
            success : true,
            user : userRef
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