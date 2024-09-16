import mongoose, { ObjectId } from "mongoose";


export interface UserInterface {
    id?: string | undefined;
    // name: string;
    email: string;
    password:string
}

