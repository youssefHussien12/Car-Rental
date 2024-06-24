import { ObjectId } from "mongodb";
import { db } from "../../databases/dbConnection.js";




const createRental = async (req, res) => {


    const { userId, carId, startDate, returnDate } = req.body


    const car = await db.collection("cars").findOne({ _id: new ObjectId(carId) });
    if (!car) {
        return res.status(404).json({ message: "car not found" });
    }
    if (car.rentalStatus == "rented") {
        return res.status(400).json({ message: "car already rented" });
    }
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }


    const rental = {
        userId: new ObjectId(userId),
        carId: new ObjectId(carId),
        startDate,
        returnDate
    }

    if (car.rental_Status == "rented") {
        return res.status(400).json({ message: "Car already Rented" })
    }

    let result = await db.collection('rentals').insertOne(rental);

    await db.collection("cars").updateOne({ _id: new ObjectId(carId) }, { $set: { rental_Status: "rented" } })
    const rentalRelation = await db.collection('rentals').aggregate([{
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    }, {
        $lookup: {
            from: 'cars',
            localField: "carId",
            foreignField: "_id",
            as: "car"
        }
    }
    ]
    ).toArray()

    return res.status(201).json({ message: "Rental created successfully", result, rentalRelation });
}


const updateRental = async (req, res) => {
    const rental = await db.collection("rentals").findOne({ _id: new ObjectId(req.params.id) });
    if (!rental) {
        res.status(404).json({ message: "Rental not found" });
    }
    let updateRental = await db.collection('rentals').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    res.status(200).json({ message: "Rental Updated", updateRental })
}



const deleteRental = async (req, res) => {
    const rental = await db.collection("rentals").findOne({ _id: new ObjectId(req.params.id) });
    if (!rental) {
        res.status(404).json({ message: "Rental not found" });
    }
    const deletedRental = await db.collection("rentals").deleteOne({ _id: new ObjectId(req.params.id) });
    await db.collection("cars").updateOne(
        { _id: new ObjectId(rental?.carId) },
        { $set: { rental_Status: "available" } }
    );
    return res.status(200).json({ message: "Rental deleted", deletedRental });
}



const getAllRental = async (req, res) => {
    let rentals = await db.collection('rentals').find().toArray()
    res.status(200).json({ message: "success", rentals })
}


const getSpecificRental = async (req, res) => {
    let rentals = await db.collection('rentals').findOne({ _id: new ObjectId(req.params.id) })
    res.status(200).json({ message: "success", rentals })
}


export {
    createRental,
    updateRental,
    deleteRental,
    getAllRental,
    getSpecificRental
}