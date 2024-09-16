import mongoose, { ObjectId } from "mongoose";


export interface adminInterface {
    id?: string | undefined;
    // name: string;
    email: string;
    password: string
}
