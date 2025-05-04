import Hotel from './hotels.model.js'

const defaultHotels = [
    {
        name: "Hotel Majestic",
        description: "Lujoso hotel en el centro de la ciudad con vistas panorámicas y servicio de primera clase",
        address: "Avenida Principal 123, Centro, Ciudad Capital",
        phone: "5551234567",
        email: "reservas@hotelmajestic.com",
        quality: 5
    },
    {
        name: "Sunset Beach Resort",
        description: "Encantador resort frente al mar con acceso privado a la playa y piscina infinita",
        address: "Calle de la Playa 45, Costa del Sol",
        phone: "5557654321",
        email: "info@sunsetbeachresort.com",
        quality: 4
    },
    {
        name: "Mountain View Lodge",
        description: "Acogedor alojamiento en las montañas con chimenea y actividades al aire libre",
        address: "Camino del Bosque 89, Sierra Nevada",
        phone: "5559876543",
        email: "contacto@mountainviewlodge.com",
        quality: 3
    },   
    {
        name: "Urban Business Hotel",
        description: "Hotel moderno para viajeros de negocios con centro de conferencias y WiFi de alta velocidad",
        address: "Calle Comercial 67, Distrito Financiero",
        phone: "5554567890",
        email: "reservations@urbanbusiness.com",
        quality: 4
    }, 
    {
        name: "Historic Grand Hotel",
        description: "Hotel patrimonial con arquitectura clásica y mobiliario de época restaurado",
        address: "Plaza Central 1, Casco Histórico",
        phone: "5552345678",
        email: "guestservices@historicgrand.com",
        quality: 5
    }
]

export const createDefaultHotels = async () => {
    try {
        const existingHotels = await Hotel.countDocuments();
        
        if (existingHotels === 0) {
            await Hotel.insertMany(defaultHotels);
            console.log('Hoteles por defecto creados exitosamente');
        }
    } catch (e) {
        console.e('General Error hotelDef', e);
    }
}