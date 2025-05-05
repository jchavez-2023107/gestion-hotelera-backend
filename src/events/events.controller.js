import Events from "../events/events.model.js";
import Hotel from '../hotels/hotels.model.js'
/**
 * Crear nuevo evento
 */
export const createEvent = async (req, res) => {
  try {
    const { name, hotel, date, services } = req.body;
    const newEvent = new Events({ name, hotel, date, services });
    await newEvent.save();

    // Si deseas retornar el hotel relacionado en la respuesta:
    const populatedEvent = await newEvent.populate('hotel');

    res.status(201).json({
      message: "Evento creado exitosamente",
      event: populatedEvent,
    });
  } catch (error) {
    console.error("Error al crear evento:", error);
    res.status(500).json({ message: "Error al crear evento", error: error.message });
  }
};

/**
 * Obtener todos los eventos con datos del hotel
 */
export const getEvents = async (req, res) => {
  try {
    const events = await Events.find().populate("hotel");
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    res.status(500).json({ message: "Error al obtener eventos" });
  }
};

/**
 * Actualizar evento por ID
 */
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Events.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('hotel');

    if (!updatedEvent) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.status(200).json({ message: "Evento actualizado", event: updatedEvent });
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    res.status(500).json({ message: "Error al actualizar evento" });
  }
};

/**
 * Eliminar evento por ID
 */
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Events.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.status(200).json({ message: "Evento eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).json({ message: "Error al eliminar evento" });
  }
};




export const addDefaultEvents = async () => {
  const total = await Events.countDocuments()
  if (total === 0) {
    try {
      const hotels = await Hotel.find()
      if (hotels.length === 0) {
        console.log('No hay hoteles disponibles para asociar eventos')
        return
      }

      const defaultEvents = [
        {
          name: 'Conferencia de Tecnología 2025',
          hotel: hotels[0]._id,
          date: new Date('2025-07-15'),
          services: ['Proyector', 'Catering', 'Wifi']
        },
        {
          name: 'Boda Elegante en el Mar',
          hotel: hotels[1]?._id || hotels[0]._id,
          date: new Date('2025-08-22'),
          services: ['Banquete', 'Música en vivo', 'Decoración floral']
        },
        {
          name: 'Reunión de Ejecutivos',
          hotel: hotels[2]?._id || hotels[0]._id,
          date: new Date('2025-09-10'),
          services: ['Sala privada', 'Servicio de café', 'Estacionamiento']
        }
      ]

      await Events.insertMany(defaultEvents)
      console.log('Eventos por defecto agregados')
    } catch (error) {
      console.error('Error al agregar eventos por defecto:', error)
    }
  } else {
    console.log('Ya existen eventos en la base de datos.')
  }
}
