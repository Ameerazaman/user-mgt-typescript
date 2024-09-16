import crypto from 'crypto';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey: string = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

export class createJWT {
    generateToken(payload: string | undefined): string | undefined {
        if (payload) {
            const token = jwt.sign({ data: payload }, secretKey as Secret, { expiresIn: '5m' });
            return token;
        }
        return undefined;
    }
}
