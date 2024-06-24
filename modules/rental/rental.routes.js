import { Router } from "express";
import { createRental, deleteRental, getAllRental, getSpecificRental, updateRental } from "./rental.controller.js";
const rentalRouter = Router()

rentalRouter.route('/').get(getAllRental).post(createRental)
rentalRouter.route('/:id').put(updateRental).get(getSpecificRental).delete(deleteRental)

export default rentalRouter