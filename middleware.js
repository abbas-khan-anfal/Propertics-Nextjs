import { NextResponse as res } from "next/server";
import { verifyToken } from "./lib/token";


export async function middleware(req){
    try
    {
        const token = await req.cookies.get('propertyToken')?.value;

        const user = token ? await verifyToken(token) : null;

        const isAuthenticated = !!user;

        const publicRoutes = ['/login','/signup'];
        const privateRoutes = ['/dashboard','/dashboard/add_property', '/dashboard/update_property/:path*'];

        const pathname = req.nextUrl.pathname;

        // console.log("Clone URL : " + cloneUrl); http://localhost/segment
        // console.log("nextUrl URL : " + pathname); /segment
        // console.log("Req URL : " + req.url); http://localhost/segment

        if(privateRoutes.includes(pathname) && !isAuthenticated)
        {
            return res.redirect(new URL('/login', req.url));
        }

        if(publicRoutes.includes(pathname) && isAuthenticated)
        {
            return res.redirect(new URL('/dashboard', req.url));
        }

        const response = res.next();
        return response;


    }
    catch(error)
    {
        return res.json({
            success : false,
            message : error.message
        }, { status : 500 });
    }
}

export const cinfig = {
    matcher : ['/login','/signup','/dashboard','/dashboard/add_property','/dashboard/update_property/:path*']
}