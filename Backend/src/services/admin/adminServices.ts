import { adminInterface} from '../../interface/adminInterface'
import { adminRepository } from '../../repositories/admin/adminRepository';

export class adminServices {
    constructor(private adminRepository: adminRepository) {}

  


    async adminSignIn(adminData: adminInterface): Promise<boolean> {
        try {
            const admin = await this.adminRepository.adminLogin(adminData.email,adminData.password);
          
            if(admin){
                return true
            }
           
            return false
        } catch (error) {
            console.error(error);
            return false; // Sign-in failed
        }
    }

    async getDashboard(): Promise<any[]> {
        try {
            const userData = await this.adminRepository.getDashboard();
         
            return userData;  // Return the fetched user data
        } catch (error) {
            console.error("Error fetching dashboard data in service:", error);
            throw new Error("Error fetching dashboard data");
        }
    }
    async editUser(params:string): Promise<any> {
        try {
            const userData = await this.adminRepository.editUser(params);
            console.log("userData in service", userData);
            return userData;  // Return the fetched user data
        } catch (error) {
            console.error("Error fetching dashboard data in service:", error);
            throw new Error("Error fetching dashboard data");
        }
    }
    async postEditUser(id: string, updates: { email: string; username: string; phone: string; password: string; }): Promise<any> {
        try {
            console.log(id, "service id");
            // Call the repository method to update user data
            const userData = await this.adminRepository.postEditUser(id, updates);

            console.log("userData in service edit post", userData);
            return userData;  // Return the result of the update operation
        } catch (error) {
            console.error("Error updating user data in service:", error);
            throw new Error("Error updating user data");
        }
    }
    async deleteUser(params:string): Promise<any> {
        try {
            const userData = await this.adminRepository.deleteUser(params);
            console.log("userData in service delete", userData);
            return userData;  // Return the fetched user data
        } catch (error) {
            console.error("Error fetching dashboard data in service:", error);
            throw new Error("Error fetching dashboard data");
        }
    }
}

