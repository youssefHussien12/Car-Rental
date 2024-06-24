import { db } from "../databases/dbConnection.js"


export let checkEmailExist = async (req , res , next)=>{
    let email = req.body.email
    let emailExist = await db.collection('users').findOne({email},{})

    if (emailExist)return res.status(409).json({message:'email already exists'}) 
        next()
}