import { Schema, model } from "mongoose";

const roomSchema = new Schema(
    {
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotels',
            required: true,
        },
        name: {
            type: String,
            required: true,
            maxLength: 100,
        },
        description: {
            type: String,
            maxLength: 300,
        },
        pricePerNight: {
            type: Number,
            required: true,
            min: 0,
        },
        type: {
            type: String,
            enum: ['single', 'double', 'family', 'suite', 'other'],
            required: true,
        },
        bedDistribution: {
            individual: { 
                type: Number, 
                default: 0 
            },
            double: { 
                type: Number, 
                default: 0 
            },
            family: { 
                type: Number, 
                default: 0 
            },
        },
        capacityMax: {
            type: Number,
            required: true,
        },
        amenities: {
            type: [String],
            default: [],
        },
        available: {
            type: Boolean,
            default: true,
        }
    }, 
    { 
        timestamps: true, 
        versionKey: false 
    }
)

export default model('Room', roomSchema);
