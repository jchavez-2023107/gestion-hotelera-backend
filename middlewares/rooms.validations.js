import Hotel from "../src/hotels/hotels.model.js"
import Room from "../src/rooms/rooms.model.js"

export const validateRoomType = (req, res, next) => {
    const { type } = req.body
    const validTypes = ['single', 'double', 'family', 'suite', 'other']

    if (type && !validTypes.includes(type)) {
        return res.status(400).send(
            { 
                message: "El tipo de habitación no es válido" 
            }
        )
    }

    next()
}

export const validatePricePerNight = (req, res, next) => {
    const { pricePerNight } = req.body

    try {
        if (pricePerNight !== undefined) {
            if (isNaN(pricePerNight) || Number(pricePerNight) <= 0) {
                return res.status(400).send(
                    {
                        success: false,
                        message: "El precio por noche debe ser un número mayor a 0"
                    }
                )
            }
        }
        next()
    } catch (err) {
        console.error(err)
    }
}

export const validateCapacityMax = (req, res, next) => {
    const { capacityMax } = req.body

    if (capacityMax && capacityMax < 1) {
        return res.status(400).send(
            { 
                message: "La capacidad máxima debe ser al menos 1" 
            }
        )
    }

    next()
}

export const validateRoomName = (req, res, next) => {
    const { name } = req.body

    if (!name || name.trim().length === 0) {
        return res.status(400).send(
            { 
                message: "El nombre de la habitación es obligatorio" 
            }
        )
    }

    next()
}

export const validateBedDistribution = (req, res, next) => {
    const { bedDistribution } = req.body

    if (!bedDistribution || Object.keys(bedDistribution).length === 0) {
        return res.status(400).send(
            { 
                message: "La distribución de camas es obligatoria" 
            }
        )
    }

    next()
}

export const validateHotelExists = async (req, res, next) => {
    const { hotel } = req.body

    try {
        const hotelExists = await Hotel.findById(hotel)
        if (!hotelExists) {
            return res.status(404).send(
                { 
                    message: "Hotel no encontrado" 
                }
            )
        }

        next()
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                message: "Error al verificar el hotel", 
                error: err.message 
            }
        )
    }
}

export const validateAmenities = (req, res, next) => {
    const { amenities } = req.body

    if (amenities && !Array.isArray(amenities)) {
        return res.status(400).send(
            { 
                message: "Las amenidades deben ser un arreglo" 
            }
        )
    }

    next()
}

export const validateAvailableField = (req, res, next) => {
    const { available } = req.body

    if (typeof available !== 'undefined' && typeof available !== 'boolean') {
        return res.status(400).send(
            { 
                message: "El campo 'available' debe ser un valor booleano" 
            }
        )
    }

    next()
}

export const validateRoomDuplication = async (req, res, next) => {
    const { name, hotel } = req.body

    try {
        const existingRoom = await Room.findOne({ name, hotel })
        if (existingRoom) {
            return res.status(409).send(
                { 
                    message: "Ya existe una habitación con este nombre en el hotel" 
                }
            )
        }
        next()
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                message: "Error al verificar la duplicación", 
                error: err.message 
            }
        )
    }
}