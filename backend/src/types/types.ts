import mongoose from "mongoose";

export type Roles = "admin" | "usuario";
export type Duracion = "1d" | "7d" | "1mes" | "3mes" | "6mes" | "1año";
export type Visibilidad = "all" | "limitado";

export interface Licencia {
  id: string;
  nombre: string;
  fechaAdq: Date;
  fechaVenc: Date;
  duracion?: Duracion;
  proveedor?: string;
  descripcion?: string;
  expediente?: string;
  estado: boolean;
  visibilidad: Visibilidad;
  oficinasIds?: string[];
  usuariosIds?: string[];
  usuarioCreador: mongoose.Schema.Types.ObjectId;
}

export interface Oficina {
  id: string;
  nombre: string;
  estado: boolean;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
  oficinaId: string;
  rol: Roles;
  habilitado: boolean;
}
