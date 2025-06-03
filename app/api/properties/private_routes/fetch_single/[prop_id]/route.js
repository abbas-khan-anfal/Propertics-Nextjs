import { NextResponse as res } from "next/server";
import propertyModel from "@/app/models/properties/property";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { getLoggedInUser } from "@/lib/getLoggedInUser";

// Api for fetching a single property from db
export async function GET(req, { params }){
    try
    {
        await connectDB();

        const loggedInUser = await getLoggedInUser();
        const { userId } = loggedInUser;
        
        if(!mongoose.isValidObjectId(userId))
        {
            return res.json({
                success : false,
                message : "Please Login to continue"
            }, { status : 400});
        }

        const { prop_id } = await params;
        if(!mongoose.isValidObjectId(prop_id))
        {
            return res.json({
                success : false,
                message : "Please login to continue"
            }, { status : 400});
        }

        const property = await propertyModel.findOne({_id : prop_id, user : userId});

        if(!property)
        {
            return res.json({
                success : false,
                message : "Property not found"
            }, { status : 404});
        }

        return res.json({
            success : true,
            property,
        }, { status : 200});
    }
    catch(error)
    {
        return res.json({
            success : false,
            message : error.message
        }, { status : 500});
    }
}