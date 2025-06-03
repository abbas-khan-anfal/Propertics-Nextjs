import { NextResponse as res } from "next/server";
import propertyModel from "@/app/models/properties/property";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import userModel from "@/app/models/auth/user";

// Api for fetching a single property from db
export async function GET(req, { params }){
    try
    {
        await connectDB();

        const { prop_id } = await params;
        if(!mongoose.isValidObjectId(prop_id))
        {
            return res.json({
                success : false,
                message : "Something went wrong"
            }, { status : 400});
        }

        const property = await propertyModel.findById(prop_id).populate('user');

        if(!property)
        {
            return res.json({
                success : false,
                message : "Property not found"
            }, { status : 404});
        }

        const propertiesRef = await propertyModel.aggregate([
                {$sample : { size : 7 }}
            ]);
        const properties = propertiesRef.filter(singlePro => singlePro._id.toString() !== prop_id.toString());

        return res.json({
            success : true,
            property,
            properties : properties
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