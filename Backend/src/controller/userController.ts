import { Request, Response } from 'express';
import { UserServices } from '../services/UserServices';
import { UserRepository } from '../repositories/UserRepository';
import { UserInterface } from '../interface/userInterface';
import crypto from 'crypto';

export class UserController {


    constructor(private userServices: UserServices) { }
    async userSignup(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const userData: UserInterface = { email, password };

        try {
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error("JWT_SECRET is not defined");
            }
            console.log("signup",email,password)
            const isSignupSuccessful = await this.userServices.userSignup(userData, jwtSecret);
            if (isSignupSuccessful) {
                res.send(true)
            } else {
                res.status(400).json({ message: "User signup failed" });
            }
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async userLogout(req: Request, res: Response): Promise<void> {
        try {
            console.log("logout")
            res.json('logout')
        }
        catch (error) {
            console.log(error)
        }
    }

    async userSignIn(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const userData: UserInterface = { email, password };

        try {
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error("JWT_SECRET is not defined");
            }

            const result = await this.userServices.userSignIn(userData, jwtSecret);
            if (result) {
                res.send(true)
            } else {
               res.send(false)
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
