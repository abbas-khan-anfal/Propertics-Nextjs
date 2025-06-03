import { SignJWT, jwtVerify } from 'jose';

// Must be a 32-byte secret
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your_super_secret_key_1234567890');

// generate token handler
export const generateToken = async (propUserId) => {
  const userId = propUserId.toString();
  if(typeof userId !== 'string' || userId.length !== 24)
  {
    throw new Error('Invalid user ID');
  }

  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
};

// verify token handler
export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
};
