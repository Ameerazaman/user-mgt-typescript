import { adminInterface } from '../../interface/adminInterface';
import User from "../../Model/userModel";
interface adminResponse {
    exists: boolean;
    message?: string;
}

export class adminRepository {
    private admin: adminInterface = {
        email: 'fathimathameeraap@gmail.com',
        password: '12345'
    };

    async adminLogin(email: string, password: string): Promise<adminResponse> {
        try {
            if (this.admin.email === email) {
                if (this.admin.password === password) {
                    return { exists: true };
                } else {
                    return { exists: false, message: "Incorrect password" };
                }
            } else {
                return { exists: false, message: "Invalid email" };
            }
        } catch (error) {
            console.error("Error in admin login:", error);
            return { exists: false, message: "Internal server error" };
        }
    }

    async getDashboard(): Promise<any[]> {
        try {
            const userData = await User.find(); // Fetch user data
           
            return userData; // Return the fetched user data
        } catch (err) {
            console.error("Error in getDashboard in repository", err);
            throw new Error("Error fetching user data");
        }
    }
    async editUser(params:string): Promise<any> {
        try {
            console.log(params,"repostry params")
            const userData = await User.findOne({_id:params}); // Fetch user data
            console.log("userdata repository", userData);
            return userData; // Return the fetched user data
        } catch (err) {
            console.error("Error in getDashboard in repository", err);
            throw new Error("Error fetching user data");
        }
    }
    async postEditUser(id: string, updates: { email: string; username: string; phone: string; password: string; }): Promise<any> {
        try {
            console.log(id, "repository id");
            // Update user document in the database
            const userData = await User.updateOne({ _id: id }, { $set: updates });

            console.log("userData repository edit", userData);
            return userData; // Return the result of the update operation
        } catch (err) {
            console.error("Error in editUser repository", err);
            throw new Error("Error updating user data");
        }
    }
    async deleteUser(params:string): Promise<any> {
        try {
            console.log(params,"repostry params")
            const userData = await User.deleteOne({_id:params}); // Fetch user data
            console.log("userdata repository", userData);
            return userData; // Return the fetched user data
        } catch (err) {
            console.error("Error in getDashboard in repository", err);
            throw new Error("Error fetching user data");
        }
    }
}
