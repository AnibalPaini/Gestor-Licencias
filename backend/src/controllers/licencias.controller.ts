import { Request, Response } from "express";
import LicenciaService from "../services/licencias.service.js";
import { Licencia, Duracion, Visibilidad } from "../types/types.js";
import mongoose from "mongoose";

const licenciaService = new LicenciaService();

export type LicenciaBody = {
  nombre: string;
  fechaAdq: string;
  fechaVenc: string;
  duracion?: Duracion;
  proveedor?: string;
  descripcion?: string;
  expediente?: string;
  estado: boolean;
  visibilidad: Visibilidad;
  oficinasIds?: string[];
  usuariosIds?: string[];
  usuarioCreador: mongoose.Schema.Types.ObjectId;
};

export type LicenciaUpdateBody = Partial<LicenciaBody>;

const getLicencias = async (req: Request, res: Response) => {
  try {
    const licencias = await licenciaService.get();
    if (!licenciaService)
      return res.status(404).send({ error: "No se encontraron licencias." });
    return res.status(200).send({ payload: licencias });
  } catch (error) {
    console.log(error);
    res.send(500).send({ error: "Error interno." });
  }
};
const getLicenciasById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).send({ error: "Faltan datos." });
    const licencias = await licenciaService.getById(id);
    if (!licenciaService)
      return res.status(404).send({ error: "No se encontraron licencias." });
    return res.status(200).send({ payload: licencias });
  } catch (error) {
    console.log(error);
    res.send(500).send({ error: "Error interno." });
  }
};

const postLicencia = async (
  req: Request<{}, {}, LicenciaBody>,
  res: Response,
) => {
  try {
    const data = req.body;
    if (
      !data.estado ||
      !data.fechaAdq ||
      !data.fechaVenc ||
      !data.nombre ||
      !data.usuarioCreador ||
      !data.visibilidad
    ) {
      return res.status(400).send({ error: "Faltan datos obligatorios!" });
    }
    let licencia = await licenciaService.post(data);
    if (!licencia) return res.status(500).send({ error: "Error interno." });
    return res.status(201).send({ payload: licencia });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error interno." });
  }
};

const putLicencia = async (
  req: Request<{ id: string }, {}, LicenciaUpdateBody>,
  res: Response,
) => {
  try {
    const id = req.params.id;
    const datos = req.body;
    const licenciaUpdated = await licenciaService.put(id, datos);
    if (!licenciaUpdated)
      return res
        .status(400)
        .send({ error: "Error al actualziar, verificar datos ingresados." });

    return res.status(200).send({ payload: licenciaUpdated });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error interno del servidor!" });
  }
};

const deleteLicencia = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const licenciaDeleted = await licenciaService.delete(id);
    if (!licenciaDeleted)
      return res.status(404).send({ error: "Licencia no encontrada" });
    return res.status(200).send({payload:`Licencia ${id} eliminada`})
  } catch (error) {}
};

export default {
  getLicencias,
  getLicenciasById,
  postLicencia,
  putLicencia,
  deleteLicencia
};
