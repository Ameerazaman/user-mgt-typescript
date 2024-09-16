import { Request, Response } from 'express';
import { adminServices } from '../../services/admin/adminServices';
import { adminInterface } from '../../interface/adminInterface';

// Define the interface for route parameters
interface Params {
    id: string; // Ensure this matches your route parameter name
}

export class adminController {
    constructor(private adminServices: adminServices) {}

    async adminLogout(req: Request, res: Response): Promise<void> {
        try {
            console.log("logout");
            res.json('logout'); // Successful logout response
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async adminSignIn(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const adminData: adminInterface = { email, password };

        try {
            const isSignInSuccessful = await this.adminServices.adminSignIn(adminData);
            if (isSignInSuccessful) {
                res.json({ success: true });
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getDashboard(req: Request, res: Response): Promise<void> {
        try {
            console.log("dashboard controller");
            const userData = await this.adminServices.getDashboard();
            
            if (userData && userData.length > 0) {
                res.json({ success: true, userData });
            } else {
                res.json({ success: false, message: "No data found" });
            }
        } catch (error) {
            console.error("Error in getDashboard:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    // Use Request<Params> to specify that req.params has the shape of Params
    async editUser(req: Request<Params>, res: Response): Promise<void> {
        try {
            console.log("Edit user");

            // Access the id directly from req.params
            const { id } = req.params;

            // Fetch user data from the adminServices
            const userData = await this.adminServices.editUser(id);
              console.log(userData,"edit user")
            if (userData) {
                res.json({ success: true, userData });
            } else {
                res.json({ success: false, message: "No data found" });
            }
        } catch (error) {
            console.error("Error in editUser:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    async postEditUser(req: Request<Params>, res: Response): Promise<void> {
        try {
            console.log("Edit user");

            // Extract id from req.params
            const { id } = req.params;
            console.log(req.body, "post edit user");

            // Extract other fields from req.body
            const { email, username, phone, password } = req.body;

            // Update user data
            const userData = await this.adminServices.postEditUser(id, { email, username, phone, password });

            console.log(userData, "edit user");

            if (userData) {
                res.json({ success: true, userData });
            } else {
                res.json({ success: false, message: "No data found" });
            }
        } catch (error) {
            console.error("Error in postEditUser:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async deleteUser(req: Request<Params>, res: Response): Promise<void> {
        try {
            console.log("delete user");

            // Access the id directly from req.params
            const { id } = req.params;

            // Fetch user data from the adminServices
            const userData = await this.adminServices.deleteUser(id);
              console.log(userData,"delete user")
            if (userData) {
                res.json({ success: true, userData });
            } else {
                res.json({ success: false, message: "No data found" });
            }
        } catch (error) {
            console.error("Error in editUser:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}
