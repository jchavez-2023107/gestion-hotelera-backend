import Room from "./rooms.model.js"
import Hotel from "../hotels/hotels.model.js"

export const createRoom = async (req, res) => {
    try {
        const { hotel, name, pricePerNight, type, capacityMax } = req.body

        if (!hotel || !name || !pricePerNight || !type || !capacityMax) {
            return res.status(400).send(
                { 
                    message: "Faltan campos obligatorios" 
                }
            )
        }

        const existingHotel = await Hotel.findById(hotel)

        if (!existingHotel) {
        return res.status(404).send(
            { 
                message: "Hotel no encontrado" }
            )
        }

        const newRoom = new Room(req.body)
        const savedRoom = await newRoom.save()
        return res.status(201).send(savedRoom)
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                message: "Error al crear habitación", 
                error: err.message 
            }
        )
    }
}


export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate("hotel", "name address").lean()

        const orderedRooms = rooms.map(room => (
            {
                _id: room._id,
                hotel: {
                    _id: room.hotel._id,
                    name: room.hotel.name,
                    address: room.hotel.address
                },
                name: room.name,
                description: room.description,
                pricePerNight: room.pricePerNight,
                type: room.type,
                capacityMax: room.capacityMax,
                amenities: room.amenities,
                bedDistribution: room.bedDistribution
            }
        )
        )

        return res.status(200).send(orderedRooms)

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: "Error al obtener habitaciones",
                error: err.message
            }
        )
    }
}

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate("hotel", "name address").lean();
    
        if (!room) {
            return res.status(404).send(
                {
                   message: "Habitación no encontrada"
                }
            )
        }
    
        const orderedRoom = {
            _id: room._id,
            hotel: {
                _id: room.hotel._id,
                name: room.hotel.name,
                address: room.hotel.address
            },
            name: room.name,
            description: room.description,
            pricePerNight: room.pricePerNight,
            type: room.type,
            capacityMax: room.capacityMax,
            amenities: room.amenities,
            bedDistribution: room.bedDistribution,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt
        }

        return res.status(200).send(orderedRoom);

    } catch (err) {
        console.error(err);
        return res.status(500).send(
            {
                message: "Error al buscar habitación",
                error: err.message
            }
        )
    }
}

export const getRoomsByHotel = async (req, res) => {
    try {
        const rooms = await Room.find(
            {
                hotel: req.params.hotelId
            }
        ).populate("hotel", "name address")
        .lean()
    
        if (!rooms || rooms.length === 0) {
            return res.status(404).send(
                {
                    message: "No se encontraron habitaciones para este hotel"
                }
            )
        }

        const orderedRooms = rooms.map(room => (
            {
                _id: room._id,
                hotel: {
                    _id: room.hotel._id,
                    name: room.hotel.name,
                    address: room.hotel.address
                },
                name: room.name,
                description: room.description,
                pricePerNight: room.pricePerNight,
                type: room.type,
                capacityMax: room.capacityMax,
                amenities: room.amenities,
                bedDistribution: room.bedDistribution,
                createdAt: room.createdAt,
                updatedAt: room.updatedAt
            }
        )
        )

        return res.status(200).send(orderedRooms)

    } catch (err) {
        console.error(err);
        return res.status(500).send(
            {
                message: "Error al buscar habitaciones del hotel",
                error: err.message
            }
        )
    }
}
  

export const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("hotel", "name address").lean()
    
        if (!updatedRoom) {
            return res.status(404).send(
                {
                    message: "Habitación no encontrada"
                }
            )
        }
    
        const orderedRoom = {
            _id: updatedRoom._id,
            hotel: {
                _id: updatedRoom.hotel._id,
                name: updatedRoom.hotel.name,
                address: updatedRoom.hotel.address
            },
            name: updatedRoom.name,
            description: updatedRoom.description,
            pricePerNight: updatedRoom.pricePerNight,
            type: updatedRoom.type,
            capacityMax: updatedRoom.capacityMax,
            amenities: updatedRoom.amenities,
            bedDistribution: updatedRoom.bedDistribution,
            createdAt: updatedRoom.createdAt,
            updatedAt: updatedRoom.updatedAt
        }
    
        return res.status(200).send(orderedRoom);

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: "Error al actualizar habitación",
                error: err.message
            }
        )
    }
}
  


export const deleteRoom = async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id)
        if (!deletedRoom) return res.status(404).send(
            { 
                message: "Habitación no encontrada" 
            }
        )
        return res.status(200).send(
            { 
                message: "Habitación eliminada correctamente" 
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                message: "Error al eliminar habitación", 
                error: err.message 
            }
        )
    }
}

export const getAvailableRooms = async (req, res) => {
    try {
        const rooms = await Room.find(
            { 
                available: true 
            }
        )
        .populate("hotel", "name address")
        .lean();
        
        if (rooms.length === 0) {
            return res.status(404).send(
                {
                    message: "No hay habitaciones disponibles en este momento"
                }
            )
        }

        const orderedRooms = rooms.map(room => (
        {
            _id: room._id,
            hotel: {
                _id: room.hotel._id,
                name: room.hotel.name,
                address: room.hotel.address
            },
            name: room.name,
            description: room.description,
            pricePerNight: room.pricePerNight,
            type: room.type,
            capacityMax: room.capacityMax,
            amenities: room.amenities,
            bedDistribution: room.bedDistribution,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt
        }
    )
    )
  
        return res.status(200).send(orderedRooms);
    } catch (err) {
        console.error(err);
        return res.status(500).send(
            {
                message: "Error al obtener habitaciones disponibles",
                error: err.message
            }
        )
    }
}