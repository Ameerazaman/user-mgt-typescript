import { UserInterface } from '../interface/userInterface';
import { UserRepository } from '../repositories/UserRepository';
import jwt from 'jsonwebtoken';
import  bcrypt from 'bcrypt'
export class UserServices {
    constructor(private userRepository: UserRepository) {}

    async userSignup(userData: UserInterface, jwtSecret: string): Promise<boolean> {
        try {
            console.log("It's service page");
            const emailExists = await this.userRepository.emailExistCheck(userData.email,userData.password);
            if (emailExists) {
                return false; // Email already exists
            }

            // Optionally generate a token
            const token = jwt.sign({ email: userData.email }, jwtSecret, { expiresIn: '1h' });
            console.log("Generated Token:", token);

            return true; // Assuming signup is successful
        } catch (error) {
            console.error(error);
            return false; // Signup failed
        }
    }
 


    async userSignIn(userData: UserInterface, jwtSecret: string): Promise<boolean> {
        try {
            const user = await this.userRepository.userLogin(userData.email,userData.password);
            console.log(user)
            if (!user || !(await bcrypt.compare(userData.password, user.userData.password))) {
                return false; // Invalid credentials
            }

            // // Generate a token
            // const token = jwt.sign({ email: userData.email }, jwtSecret, { expiresIn: '1h' });
            // console.log("Generated Token:", token);

            return true
        } catch (error) {
            console.error(error);
            return false; // Sign-in failed
        }
    }
}

