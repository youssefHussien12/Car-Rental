import { Router } from "express";
import { deleteUser, getAllUsers, getSpecificUser, signin, signup, updateUser } from "./user.controller.js";
import { checkEmailExist } from "../../middleware/checkEmailExist.js";


const userRouter = Router()

userRouter.post('/signup', checkEmailExist, signup )
userRouter.post('/signin', signin )
userRouter.get('/', getAllUsers )
userRouter.route('/:id').get(getSpecificUser ).put( updateUser ).delete( deleteUser )



export default userRouter