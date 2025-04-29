import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || '...';
const expiration ='2h';

// Function to sign a token with user data
export function signToken({ _id, username, email, role}) {
    const payload = { _id, username, email, role };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}