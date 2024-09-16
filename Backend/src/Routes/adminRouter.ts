import express, { Router } from 'express';
import { adminController } from '../controller/admin/adminController';
import { adminServices } from '../services/admin/adminServices';
import { adminRepository } from '../repositories/admin/adminRepository';

const adminRouter: Router = express.Router();

// Create instances of Repository and Services
const repository = new adminRepository();
const services = new adminServices(repository);

// Create an instance of Controller with injected Services
const controller = new adminController(services);

adminRouter.post('/adminLogin', (req, res) => controller.adminSignIn(req, res));
adminRouter.get('/dashboard', (req, res) => controller.getDashboard(req, res))
adminRouter.get('/edit-user/:id', (req, res) => controller.editUser(req, res))

adminRouter.post('/edit-user/:id', (req, res) => controller.postEditUser(req, res));
adminRouter.delete('/delete-user/:id', (req, res) => controller.deleteUser(req, res))
adminRouter.get('/logout', (req, res) => controller.adminLogout(req, res))

export default adminRouter;
