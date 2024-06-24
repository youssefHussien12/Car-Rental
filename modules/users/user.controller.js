import { ObjectId } from 'mongodb'
import { db } from '../../databases/dbConnection.js'

const signup = async (req, res) => {
    let user = await db.collection('users').insertOne(req.body)
    res.status(201).json({ message: 'success', user })
}


const signin = async (req, res) => {
    let email = req.body.email
    let signInEmail = await db.collection('users').findOne({ email }, {})
    let id = signInEmail?._id
    if (signInEmail) {
        return res.status(200).json({ message: 'login..... token', id })
    } else {
        return res.status(401).json({ message: 'email incorrect' })
    }
}


const getAllUsers = async (req, res) => {
    let users = await db.collection('users').find().toArray()
    res.status(200).json({ message: 'success', users })
}


const updateUser = async (req, res) => {
    let user = await db.collection('users').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    res.status(200).json({ message: 'success', user })
}


const deleteUser = async (req, res) => {
    let user = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) })
    res.status(200).json({ message: 'success', user })
}


const getSpecificUser = async (req, res) => {
    let user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) })
    res.status(200).json({ message: 'success', user })
}

export {
    signup,
    signin,
    getAllUsers,
    updateUser,
    deleteUser,
    getSpecificUser
}