import express, { Router } from 'express';
import { UserController } from '../controller/userController';
import { UserServices } from '../services/UserServices';
import { UserRepository } from '../repositories/UserRepository';

const userRouter: Router = express.Router();

// Create an instance of UserRepository and UserServices
const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);

// Pass the instance of UserServices to the UserController
const userController = new UserController(userServices);

userRouter.post('/signup', (req, res) => userController.userSignup(req, res));
userRouter.get('/logout',(req,res)=>userController.userLogout(req,res))
userRouter.post('/signIn',(req,res)=>userController.userSignIn(req,res))

export default userRouter;
