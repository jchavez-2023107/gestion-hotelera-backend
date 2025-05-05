/* ------------------RECOMENDACION DE COSAS MINIMAS----------
import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  description: {
    type: String,
    maxLength: 500,
  },
  date: {
    type: Date,
    required: true,
  },
  eventType: {
    type: String,
    enum: ['wedding', 'conference', 'meeting', 'other'],
    default: 'other',
  },
  services: {
    type: [String], // Ej. ["catering", "decoración", "audio"]
    default: [],
  }
}, { timestamps: true, versionKey: false });

export default model('Event', eventSchema);
*/