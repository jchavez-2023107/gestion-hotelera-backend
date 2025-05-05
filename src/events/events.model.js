import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del evento es obligatorio"],
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotels", // Relación con el modelo de Hotel
      required: [true, "El hotel asociado es obligatorio"],
    },
    date: {
      type: Date,
      required: [true, "La fecha del evento es obligatoria"],
    },
    services: [{
      type: String,
      default: "",
    }],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Events", eventSchema);
