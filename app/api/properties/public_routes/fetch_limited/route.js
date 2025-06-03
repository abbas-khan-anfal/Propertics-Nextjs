// app/api/properties/fetch_limited/route.js

import { NextResponse as res } from "next/server";
import connectDB from "@/lib/db";
import propertyModel from "@/app/models/properties/property";

// api to fetch limited properties
export async function GET(req) {
  try {
    await connectDB();

    // Get query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 3;
    const skip = (page - 1) * limit;

    const totalProperties = await propertyModel.countDocuments();

    const properties = await propertyModel.find().skip(skip).limit(limit);

    return res.json(
      {
        success: true,
        data: properties || [],
        totalPages: Math.ceil(totalProperties / limit),
        currentPage: page,
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
