import User from "../users/user.model.js"
import Room from "../rooms/rooms.model.js"
import Reservation from "./reservations.model.js"

export const createReservation = async (req, res) => {
    try {
        const {user, room, checkInDate, checkOutDate, numberOfGuests, status} = req.body
        if(!user || !room || !checkInDate || !checkOutDate || !numberOfGuests || !status){
            return res.status(400).send(
                { 
                    message: "Faltan campos obligatorios." 
                }
            )            
        }

        const existingUser = await User.findById(user)

        if (!existingUser) {
            return res.status(404).send(
                { 
                    message: "Usuario no encontrado." }
                )
            }  

        const existingRoom = await Room.findById(room)

        if (!existingRoom) {
            return res.status(404).send(
                { 
                    message: "Habitación no encontrada." }
                )
            }  
            
        // Validación: Verificar si la habitación ya está confirmada en el rango de fechas o por el estado
        const conflictingReservation = await Reservation.findOne({
            room: room,
            status: 'confirmed',
            $or: [
                { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } }
            ]
        })

        if (conflictingReservation) {
            return res.status(400).send({
                message: "La habitación ya está ocupada en las fechas seleccionadas."
            })
        }


        if (numberOfGuests > existingRoom.capacityMax) {
            return res.status(400).send(
                {
                    message: "El número de huéspedes excede la capacidad máxima de la habitación." 
                }
            )
        }            
        
        const newReservation = new Reservation(req.body)
        const savedReservation = await newReservation.save()
        return res.status(201).send(
            {
                success: true,
                message: 'La reservación fue realizada con exito',
                savedReservation
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: "Error al crear la reservación.",
                error: error.message
            }
        )
    }
}

export const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('user', 'name email') 
            .populate('room', 'name type')  

        return res.status(200).send(
            {
                success: true,
                message: 'Reservaciones obtenidas exitosamente.',
                reservations
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: "Error al obtener las reservaciones.",
                error: error.message
            }
        )
    }
}


export const getReservationsById = async (req, res) => {
    try {
        const { id } = req.params

        const reservation = await Reservation.findById(id)
            .populate('user', 'name email') 
            .populate('room', 'name type') 

        if (!reservation) {
            return res.status(404).send(
                {
                    message: 'Reservación no encontrada.'
                }  
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Reservación encontrada.',
                reservation
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: "Error al buscar las reservaciones.",
                error: error.message
            }
        )        
    }
}

export const updateReservation = async (req, res) => {
    try {
        const { numberOfGuests } = req.body

        // Si se intenta actualizar el número de huéspedes, validamos con la habitación
        if (numberOfGuests) {
            const reservation = await Reservation.findById(req.params.id).lean()
            if (!reservation) {
                return res.status(404).send(
                    {
                        message: "Reservación no encontrada." 
                    }
                )
            }

            const room = await Room.findById(reservation.room).lean()
            if (room && numberOfGuests > room.capacityMax) {
                return res.status(400).send(
                    {
                        message: `El número de huéspedes excede la capacidad máxima de la habitación.`
                    }
                )
            }
        }

        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
            .populate("user", "name email")
            .populate("room", "name capacityMax")
            .lean()

        if (!updatedReservation) {
            return res.status(404).send(
                { 
                    message: "Reservación no encontrada." 
                }
            )
        }

        const orderedReservation = {
            _id: updatedReservation._id,
            user: updatedReservation.user,
            room: updatedReservation.room,
            checkInDate: updatedReservation.checkInDate,
            checkOutDate: updatedReservation.checkOutDate,
            numberOfGuests: updatedReservation.numberOfGuests,
            status: updatedReservation.status,
            createdAt: updatedReservation.createdAt,
            updatedAt: updatedReservation.updatedAt
        }

        return res.status(200).send(
            {
                success: true,
                message: 'La reservación fue actualizada con exito',
                orderedReservation
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: "Error al actualizar la reservación",
                error: error.message
            }
        )
    }
}

export const deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id)
        if (!deletedReservation)return res.status(404).send(
            { 
                message: "Reservación no encontrada." 
            }
        )
        return res.status(200).send(
            { 
                message: "Reservación eliminada correctamente." 
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            { 
                message: "Error al eliminar la reservación.", 
                error: error.message 
            }
        )        
    }
}