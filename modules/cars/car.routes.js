import { Router } from "express";
import { addCar, deleteCar, getAllCars, getCarsByNames, getSingelCar, updateCar } from "./car.controller.js";


const carRouter = Router()

carRouter.route('/').post(addCar).get(getAllCars).get(getCarsByNames);
carRouter.route('/:id').get(getSingelCar).put(updateCar).delete(deleteCar)




export default carRouter