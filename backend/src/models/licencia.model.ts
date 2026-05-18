import mongoose from "mongoose";
import { Licencia } from "../types/types.js";

const LicenciaSchema = new mongoose.Schema<Licencia>({
  nombre: { type: String, required: true },
  fechaAdq: { type: Date, required: true, default: Date.now },
  fechaVenc: { type: Date, required: true },
  duracion: { enum: ["1d", "7d", "1mes", "3mes", "6mes", "1año"] },
  proveedor: { type: String },
  descripcion: { type: String },
  expediente: { type: String },
  visibilidad: { enum: ["all", "limitado"] },
  oficinasIds: { type: [] },
  usuariosIds: { type: [] },
  usuarioCreador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  estado: { type: Boolean, required: true, default: true },
});

const LicenciaModel = mongoose.model<Licencia>("Licencia", LicenciaSchema);
export default LicenciaModel;