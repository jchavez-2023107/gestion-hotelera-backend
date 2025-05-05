import { Router } from "express"
import { createReservation, deleteReservation, getAllReservations, getReservationsById, updateReservation } from "./reservations.controller.js"
import { validateReservationDates, validateReservationStatus } from "../../middlewares/reservations.validations.js"
import { validateJWT, validateRoles } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post("/addReservation",
    [
        validateReservationDates,
        validateReservationStatus
    ],
createReservation)

api.get("/getReservations", 
    [
            validateJWT, 
            validateRoles("Admin", "Employee"),
    ],
getAllReservations)

api.get("/getReservation/:id", getReservationsById)

api.put("/updateReservation/:id",
    [
        validateJWT, 
        validateRoles("Admin", "Employee"),        
        validateReservationDates,
        validateReservationStatus        
    ],
updateReservation)

api.delete("/deleteReservation/:id", 
    [
        validateJWT, 
        validateRoles("Admin", "Employee") 
    ],    
deleteReservation)

export default api