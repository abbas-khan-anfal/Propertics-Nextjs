import mongoose from "mongoose";
import userModel from "@/app/models/auth/user";
import bcrypt from 'bcrypt';
import connectDB from "@/lib/db";
import { NextResponse as res } from "next/server";

// api for signup new user
export async function POST(req)
{
    try
    {
        await connectDB();

        const { username, email, password } = await req.json();

        if(password.length < 8)
        {
            return res.json({
                success : false,
                message : "Password must be at least 8 characters long"
            },{ status : 400});
        }

        if(username.trim() === "" || email.trim() === "" || password.trim() === "")
        {
            return res.json({
                success : true,
                message : "All fields are required"
            },{ status : 200});
        }

        const user = await userModel.findOne({email});

        if(user)
        {
            return res.json({
                success : false,
                message : "User already exist"
            },{ status : 400});
        }

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            username, email, password:hashedPassword
        });

        return res.json({
            success : true,
            message : "Signup successfull"
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