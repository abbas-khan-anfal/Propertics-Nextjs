import mongoose from "mongoose";
import userModel from "@/app/models/auth/user";
import bcrypt from 'bcrypt';
import connectDB from "@/lib/db";
import { NextResponse as res } from "next/server";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/token";

// api for login the user
export async function POST(req)
{
    try
    {
        await connectDB();

        const { email, password } = await req.json();

        if(email.trim() === "" || password.trim() === "")
        {
            return res.json({
                success : true,
                message : "All fields are required"
            },{ status : 200});
        }

        const user = await userModel.findOne({email});

        if(!user)
        {
            return res.json({
                success : false,
                message : "Incorrect email & password"
            },{ status : 400});
        }

        // decrypt password
        const isMatchPass = await bcrypt.compare(password, user.password);

        if(!isMatchPass)
        {
            return res.json({
                success : false,
                message : "Incorrect email & password"
            },{ status : 400});
        }

        // generate new token
        const token = await generateToken(user._id);
        const userCookies = await cookies();
        userCookies.set("propertyToken", token, {
            httpOnly : true,
            maxAge : 7 * 24 * 60 * 60 * 1000, // expire in 7 days
        });

        return res.json({
            success : true,
            message : "Login successfull"
        },{ status : 200});
    }
    catch(error)
    {
        console.log("Error in login route : ", error);
        return res.json({
            success : false,
            message : error.message
        },{ status : 500});
    }
}