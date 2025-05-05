import { Router } from "express"
import { validateJWT, validateRoles } from "../../middlewares/validate.jwt.js"
import { addHotel, deleteHote, getHotel, updateHote } from "./hotels.controller.js"
import { validateHotelPhone, validateHotelDelete } from "../../middlewares/hotels.validations.js"

const api = Router()

api.post('/addHotel', [validateJWT, validateRoles('Admin'), validateHotelPhone], addHotel)
api.get('/getHotel', [validateJWT], getHotel)
api.put('/updateHotel/:id', [validateJWT, validateRoles('Admin'), validateHotelPhone], updateHote)
api.delete('/deleteHotel/:id', [validateJWT, validateRoles('Admin'), validateHotelDelete], deleteHote)

export default api