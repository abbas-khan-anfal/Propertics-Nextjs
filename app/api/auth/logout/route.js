import { NextResponse as res } from "next/server";
import { cookies } from "next/headers";

// api for logout the user
export async function GET(req)
{
    try
    {
        const userCookies = await cookies();
        // delete cookies
        userCookies.delete("propertyToken", "", {
            httpOnly : true,
            maxAge : Date.now(0)
        });

        return res.json({
            success : true,
            message : "Logout successfull"
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