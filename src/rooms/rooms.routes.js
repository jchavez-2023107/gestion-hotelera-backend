import { Router } from "express"
import {
  createRoom,
  getRooms,
  getRoomById,
  getRoomsByHotel,
  updateRoom,
  deleteRoom,
  getAvailableRooms
} from "./rooms.controller.js"

import {
  validateRoomType,
  validatePricePerNight,
  validateCapacityMax,
  validateRoomName,
  validateBedDistribution,
  validateHotelExists,
  validateAmenities,
  validateAvailableField,
  validateRoomDuplication
} from "../../middlewares/rooms.validations.js"

import { validateJWT, validateRoles } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post("/addRoom", 
  [
    validateJWT, 
    validateRoles("Admin"),
    validateRoomType,
    validatePricePerNight,
    validateCapacityMax,
    validateRoomName,
    validateBedDistribution,
    validateHotelExists,
    validateAmenities,
    validateAvailableField,
    validateRoomDuplication
  ], 
  createRoom
)

api.get("/getRooms", 
  [
    validateJWT
  ], 
  getRooms
)

api.get("/getRoom/:id", 
  [
    validateJWT
  ],
  getRoomById
)

api.get("/getRoomsByHotel/:hotelId", 
  [
    validateJWT
  ], 
  getRoomsByHotel
)

api.get("/getAvailableRooms", 
  [
    validateJWT
  ], 
  getAvailableRooms
)

api.put("/updateRoom/:id", 
  [
    validateJWT, 
    validateRoles("Admin"),
    validateRoomType,
    validatePricePerNight,
    validateCapacityMax,
    validateRoomName,
    validateBedDistribution,
    validateHotelExists,
    validateAmenities,
    validateAvailableField
  ], 
  updateRoom
)

api.delete("/deleteRoom/:id", 
  [
    validateJWT, 
    validateRoles("Admin")
  ], 
  deleteRoom
)

export default api
