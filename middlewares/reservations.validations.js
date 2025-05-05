import User from '../src/users/user.model.js'
import Room from '../src/rooms/rooms.model.js'
import Reservations from '../src/reservations/reservations.model.js'

export const validateReservationDates = (req, res, next) => {
    const { checkInDate, checkOutDate } = req.body

    const start = new Date(checkInDate)
    const end = new Date(checkOutDate)

    if (isNaN(start) || isNaN(end)) {
        return res.status(400).send({
            message: "Las fechas de entrada y salida deben ser válidas."
        })
    }

    if (start >= end) {
        return res.status(400).send({
            message: "La fecha de salida debe ser posterior a la fecha de entrada."
        })
    }

    next()
}

export const validateReservationStatus = (req, res, next) => {
    const { status } = req.body
    const validStatuses = ['pending', 'confirmed', 'cancelled']

    if (!validStatuses.includes(status)) {
        return res.status(400).send({
            message: `El estado de la reservación debe ser uno de los siguientes: ${validStatuses.join(', ')}.`
        })
    }

    next()
}