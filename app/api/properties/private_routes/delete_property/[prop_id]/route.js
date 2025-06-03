import { NextResponse as res } from "next/server";
import propertyModel from "@/app/models/properties/property";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";
import { getLoggedInUser } from "@/lib/getLoggedInUser";


// Api to delete message
export async function DELETE(req, { params }){
    try
    {
        await connectDB();
        const { prop_id } = await params;

        const loggedInUser = await getLoggedInUser();
        const { userId } = loggedInUser;

        if(!mongoose.isValidObjectId(userId))
        {
            return res.json({
                success : false,
                message : "Please Login to continue"
            }, { status : 400});
        }

        if(!mongoose.isValidObjectId(prop_id))
        {
            return res.json({
                success : false,
                message : "Invalid property id"
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

        if(property?.img_pub_ids?.length > 0)
        {
            const deletedFiles = property?.img_pub_ids.map((publicId) => (
                cloudinary.uploader.destroy(publicId)
            ));
            await Promise.all(deletedFiles);
        }

        await property.deleteOne();

        return res.json({
            success : true,
            message : "Property deleted successfully"
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