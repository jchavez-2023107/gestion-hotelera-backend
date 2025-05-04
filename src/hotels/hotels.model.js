import { Schema, model } from "mongoose"

const hotelSchema = Schema(
    {
        name: {
            type: String,
            maxLength: 100,
            unique: true,
            required: true
        },
        description: {
            type: String,
            maxLength: 200,
            required: true
        },
        address: {
            type: String,
            maxLength: 300,
            unique: true,
            required: true
        },
        phone: {
            type: String,
            maxLength: 12,
            unique: true,
            required: true
        },
        email: {
            type: String,
            required: [true, "El correo es obligatorio"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Debe ser un correo válido"],
        },
        quality:{
            type: Number,
            required: true,
            min: [1, 'La calidad minima es 1'],
            max: [5, 'La calidad maxima es 5']
        }
    },
    {
        versionKey: false,
        timestamps: false 
    }
)

export default model ('Hotels', hotelSchema)