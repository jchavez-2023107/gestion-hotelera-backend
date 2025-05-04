import Hotel from './hotels.model.js'
import Room from '../rooms/rooms.model.js'

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
        const existingHotels = await Hotel.countDocuments()

        if (existingHotels === 0) {
            const createdHotels = await Hotel.insertMany(defaultHotels)
            console.log('✅ Hoteles por defecto creados exitosamente')

            const roomData = [
                // Hotel Majestic
                {
                    name: "Habitación Ejecutiva",
                    description: "Elegante habitación con escritorio y minibar",
                    pricePerNight: 120,
                    type: "single",
                    capacityMax: 2,
                    amenities: ["WiFi", "Minibar", "Escritorio", "Aire acondicionado"],
                    bedDistribution: "1 cama king",
                    available: true
                },
                {
                    name: "Suite Presidencial",
                    description: "Suite de lujo con jacuzzi y vista panorámica",
                    pricePerNight: 350,
                    type: "suite",
                    capacityMax: 4,
                    amenities: ["WiFi", "Jacuzzi", "Balcón", "Sala", "TV"],
                    bedDistribution: "1 cama king + sofá cama",
                    available: true
                },
            
                // Sunset Beach Resort
                {
                    name: "Bungalow Frente al Mar",
                    description: "Bungalow privado con terraza y acceso a la playa",
                    pricePerNight: 180,
                    type: "other", // Bungalow no está en enum, lo clasificamos como 'other'
                    capacityMax: 3,
                    amenities: ["WiFi", "Terraza", "Minibar", "Hamac"],
                    bedDistribution: "1 cama queen + 1 individual",
                    available: true
                },
                {
                    name: "Habitación Doble Deluxe",
                    description: "Habitación con vista al mar y dos camas grandes",
                    pricePerNight: 160,
                    type: "double",
                    capacityMax: 4,
                    amenities: ["WiFi", "Vista al mar", "Balcón", "TV"],
                    bedDistribution: "2 camas queen",
                    available: true
                },
            
                // Mountain View Lodge
                {
                    name: "Cabaña de Montaña",
                    description: "Cabaña rústica con chimenea y vista al bosque",
                    pricePerNight: 110,
                    type: "family", // Ideal para familias
                    capacityMax: 4,
                    amenities: ["Chimenea", "Terraza", "WiFi", "Calefacción"],
                    bedDistribution: "2 camas matrimoniales",
                    available: true
                },
                {
                    name: "Habitación Estándar con Balcón",
                    description: "Habitación acogedora con balcón al bosque",
                    pricePerNight: 90,
                    type: "single",
                    capacityMax: 2,
                    amenities: ["WiFi", "Balcón", "TV"],
                    bedDistribution: "1 cama queen",
                    available: true
                },
            
                // Urban Business Hotel
                {
                    name: "Business Room",
                    description: "Habitación moderna con escritorio y buena iluminación",
                    pricePerNight: 130,
                    type: "single",
                    capacityMax: 2,
                    amenities: ["WiFi", "Escritorio", "TV", "Caja fuerte"],
                    bedDistribution: "1 cama queen",
                    available: true
                },
                {
                    name: "Sala de Reuniones + Habitación",
                    description: "Suite equipada con área de trabajo y descanso",
                    pricePerNight: 210,
                    type: "suite",
                    capacityMax: 3,
                    amenities: ["Sala de reuniones", "WiFi", "Aire acondicionado"],
                    bedDistribution: "1 cama queen + sofá",
                    available: true
                },
            
                // Historic Grand Hotel
                {
                    name: "Habitación Vintage",
                    description: "Decoración clásica con mobiliario de época",
                    pricePerNight: 140,
                    type: "double",
                    capacityMax: 2,
                    amenities: ["Muebles antiguos", "WiFi", "TV"],
                    bedDistribution: "1 cama king",
                    available: true
                },
                {
                    name: "Suite Patrimonial",
                    description: "Amplia suite con detalles históricos y lujo",
                    pricePerNight: 220,
                    type: "suite",
                    capacityMax: 3,
                    amenities: ["Balcón", "WiFi", "Sala", "Chimenea"],
                    bedDistribution: "1 cama king + sofá cama",
                    available: true
                }
            ]
            

            const allRooms = roomData.map((room, index) => (
                {
                    ...room,
                    hotel: createdHotels[Math.floor(index / 2)]._id
                }
            )
        )

            await Room.insertMany(allRooms)
            console.log('✅ 10 habitaciones por defecto creadas exitosamente')
        }
    } catch (e) {
        console.error('❌ Error al crear hoteles o habitaciones por defecto:', e)
    }
}
