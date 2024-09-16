import { UserInterface } from '../interface/userInterface';
import User from "../Model/userModel";

interface UserLoginResponse {
    exists: boolean;
    userData?: any; // You can replace `any` with a more specific type if you have one
}

    export class UserRepository {
        async emailExistCheck(email: string,password:string): Promise<boolean> {
            console.log(email,password,"repostry")
             let existUser=await User.findOne({email:email})
             if(existUser){
                return false
             }
             else{
             await User.create({email:email,password:password})
             return false; 
             }
        }

        async userLogin(email: string, password: string): Promise<UserLoginResponse> {
            try {
              
                const existUser = await User.findOne({ email: email });
                console.log(existUser,"exist user")
                if (existUser) {
                    
                    
                    return { exists: true, userData: existUser };
                } else {
                    return { exists: false };
                }
            } catch (error) {
                console.error("Error in user login:", error);
                return { exists: false }; // or handle the error as needed
            }
        }

    }
    


