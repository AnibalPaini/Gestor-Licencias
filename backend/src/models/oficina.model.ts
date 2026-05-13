import mongoose from "mongoose";
import { Oficina } from "../types/types.js";

const OficinaSchema = new mongoose.Schema<Oficina>({
  nombre: { type: String, required: true },
  estado: { type: Boolean, required: true, default: true },
});

const OficinaModel = mongoose.model<Oficina>("Oficina", OficinaSchema);

export default OficinaModel;