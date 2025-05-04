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

import { validateJWT, validateRoles } from "../../middlewares/validate.jwt.js"


const api = Router()

api.post("/addRoom", 
    [
        validateJWT, 
        validateRoles("Admin")
    ], 
createRoom)

api.get("/getRooms", 
    [
        validateJWT
    ], 
getRooms)

api.get("/getRoom/:id", 
    [
        validateJWT
    ],
getRoomById)

api.get("/getRoomsByHotel/:hotelId", 
    [
        validateJWT
    ], 
getRoomsByHotel)

api.get("/getAvailableRooms", 
    [
        validateJWT
    ], 
getAvailableRooms)

api.put("/updateRoom/:id", 
    [
        validateJWT, 
        validateRoles("Admin")
    ], 
updateRoom)

api.delete("/deleteRoom/:id", 
    [
        validateJWT, 
        validateRoles("Admin")
    ], 
deleteRoom)

export default api
