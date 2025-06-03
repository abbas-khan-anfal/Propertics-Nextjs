import { NextResponse as res } from "next/server";
import connectDB from "@/lib/db";
import propertyModel from "@/app/models/properties/property";

// api to search properties
export async function GET(req, {params}) {
  try {
    await connectDB();
    const {srchTrm} = await params;

    const properties = await propertyModel.find({
      $or : [
        {title: {$regex: srchTrm, $options: 'i'}},
        {description: {$regex: srchTrm, $options: 'i'}},
        {location_name: {$regex: srchTrm, $options: 'i'}},
      ]
    })

    return res.json(
      {
        success: true,
        data: properties
      },
      { status: 200 }
    );
  } catch (error) {
    return res.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
