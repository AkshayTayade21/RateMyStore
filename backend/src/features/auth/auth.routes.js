import express from 'express';
import AuthController from './auth.controller.js';
import { loginValidation, registerValidation, updatePasswordValidation } from './auth.validation.js';
import validationMiddleware from '../../middleware/validation.middleware.js';
import authMiddleware from '../../middleware/auth.middleware.js';



const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register',registerValidation,validationMiddleware,(req,res,)=>{
    authController.register(req,res);
});

authRouter.post('/login',loginValidation,validationMiddleware,(req,res)=>{
    authController.login(req,res);
})
console.log('Update Password Check');
authRouter.post("/update-password",authMiddleware,updatePasswordValidation,validationMiddleware,(req, res) => {
  console.log('Update Password');
authController.updatePassword(req, res)
});

authRouter.post("/logout", authMiddleware, (req, res) => {
  authController.logout(req, res);
});

export default authRouter;