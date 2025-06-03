import { cookies } from "next/headers";
import { verifyToken } from "./token";

// get logged in user handler
export async function getLoggedInUser() {
  const userCookies = await cookies();
  const token = userCookies.get("propertyToken")?.value;
  
  const verifiedToken = token ? await verifyToken(token) : null;
  return verifiedToken;

}
