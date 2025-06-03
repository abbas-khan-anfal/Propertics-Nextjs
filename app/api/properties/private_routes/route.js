import { NextResponse as res } from "next/server";
import connectDB from "@/lib/db";
import propertyModel from "@/app/models/properties/property";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";
import { getLoggedInUser } from "@/lib/getLoggedInUser";


// Api for saving property in db
export async function POST(req){
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

        const formData = await req.formData();
        const files = formData.getAll('imgs');
        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const locationName = formData.get('location_name');
        const locationUrl = formData.get('location_url');

        // check files length
        if(files.length > 5)
        {
            return res.json({
                success : false,
                message : "Please select at least 5 image"
            }, { status : 400});
        }

        const imgPaths = [];
        const imgPubIds = [];
        
        if(files && files.length > 0)
        {
            for(let file of files)
            {
                const buffer = await file.arrayBuffer();
                const bytes = new Uint8Array(buffer);
                const base64String = Buffer.from(bytes).toString('base64');

                // Sanitize filename (remove extension and special chars)
                const fileName = file.name.split(".")[0].replace(/[^a-zA-Z0-9_-]/g, "");
                const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

                const response = await cloudinary.uploader.upload(
                    `data:${file.type};base64,${base64String}`,
                    {
                        folder: "propertics/property_imgs",
                        public_id: `${fileName}-${uniqueId}`, // Safe ID
                    }
                )
                imgPaths.push(response.secure_url); // For frontend
                imgPubIds.push(response.public_id); // For deletion
            }
        }

        // check empty with trim
        if(title.trim() === "" || description.trim() === "" || price.trim() === "" || locationName.trim() === "" || locationUrl.trim() === "")
        {
            throw new Error("All fields are required");
        }

        const property = await propertyModel.create({
            title,
            description,
            price,
            location_name : locationName,
            location_url : locationUrl,
            img_paths : imgPaths,
            img_pub_ids : imgPubIds,
            user : userId
        });

        return res.json({
            success : true,
            message : "Property saved successfully"
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

// Api for fetching properties from db
export async function GET(req){
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

        const properties = await propertyModel.find({user : userId});

        return res.json({
            success : true,
            properties,
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

// Api for updating property in db
export async function PUT(req){
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
        
        const formData = await req.formData();
        const files = formData.getAll('imgs');
        const prop_id = formData.get('prop_id');
        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const locationName = formData.get('location_name');
        const locationUrl = formData.get('location_url');

        if(title.trim() === "" || description.trim() === "" || price.trim() === "" || locationName.trim() === "" || locationUrl.trim() === "")
        {
            return res.json({
                success : false,
                message : "All fields are required"
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

        if(title && title !== property.title)
        {
            property.title = title;
        }
        if(description && description !== property.description)
        {
            property.description = description;
        }
        if(price && price !== property.price)
        {
            property.price = price;
        }
        if(locationName && locationName !== property.location_name)
        {
            property.location_name = locationName;
        }
        if(locationUrl && locationUrl !== property.location_url)
        {
            property.location_url = locationUrl;
        }

        if(files.length > 0)
        {
            const imgPaths = [];
            const imgPubIds = [];

            // delete old images
            if(property.img_pub_ids)
            {
                if(property.img_pub_ids.length > 0)
                {
                    const deleteOldImages = property.img_pub_ids.map(publicId => cloudinary.uploader.destroy(publicId));
                    await Promise.all(deleteOldImages);
                }
            }

            // upload new images
            for(let file of files)
            {
                const buffer = await file.arrayBuffer();
                const bytes = new Uint8Array(buffer);
                const base64String = Buffer.from(bytes).toString('base64');
                const dataURI = `data:${file.type};base64,${base64String}`;

                // Sanitize filename (remove extension and special chars)
                const fileName = file.name.split(".")[0].replace(/[^a-zA-Z0-9_-]/g, "");
                const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

                const cloudRes = await cloudinary.uploader.upload(
                    dataURI,
                    {
                        folder: "propertics/property_imgs",
                        public_id: `${fileName}-${uniqueId}`, // Safe ID
                    }
                );
                imgPaths.push(cloudRes.secure_url); // For frontend
                imgPubIds.push(cloudRes.public_id); // For deletion
            }
            property.img_paths = imgPaths;
            property.img_pub_ids = imgPubIds;

        }
        
        await property.save();

        return res.json({
            success : true,
            message : "Property updated successfully",
        }, { status : 200});
    }
    catch(error)
    {
        console.log(error);
        return res.json({
            success : false,
            message : error.message
        }, { status : 500});
    }
}