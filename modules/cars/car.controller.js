import { ObjectId } from "mongodb"
import { db } from "../../databases/dbConnection.js"



const addCar = async (req, res) => {
    let car = await db.collection('cars').insertOne(req.body)
    res.status(201).json({ message: "success", car })
}


const getSingelCar = async (req, res) => {
    let car = await db.collection('cars').findOne({ _id: new ObjectId(req.params.id) })
    res.status(201).json({ message: "success", car })
}


const getAllCars = async (req, res) => {
    let cars = await db.collection('cars').find().toArray()
    res.status(201).json({ message: "success", cars })
}


const updateCar = async (req, res) => {
    let car = await db.collection('cars').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    res.status(201).json({ message: "success", car })
}

const deleteCar = async (req, res) => {
    let car = await db.collection('cars').deleteOne({ _id: new ObjectId(req.params.id) })
    res.status(201).json({ message: "success", car })
}

const getCarsByNames = async (req, res) => {
    try {
        const { names } = req.query;
        if (!names) {
            return res.status(400).json({ message: "names are required" });
        }
        const nameArr = names.split(",").map((name) => name.trim());
        const cars = await db.collection("cars").find({ name: { $in: nameArr } }).toArray();
        res.status(200).json({ message: "success", cars });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    addCar,
    getSingelCar,
    getAllCars,
    updateCar,
    deleteCar,
    getCarsByNames
}