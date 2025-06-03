import propertyModel from "@/app/models/properties/property";
import connectDB from "@/lib/db";
import { NextResponse as res } from "next/server";

// api to fetch random properties
export async function GET(req)
{
    try
    {

        await connectDB();
        const properties = await propertyModel.aggregate([
            {$sample : { size : 9 }}
        ]);

        return res.json({
            success : true,
            properties
        }, { status : 200 });
    }
    catch(error)
    {
        return res.json({
            success : false,
            message : error.message
        }, { status : 500 });
    }
}