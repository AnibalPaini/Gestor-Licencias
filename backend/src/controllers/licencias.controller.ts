import { Request, Response } from "express";
import LicenciaService from "../services/licencias.service.js";
import { Licencia } from "../types/types.js";

const licenciaService = new LicenciaService();

export type LicenciaBody = Omit<Licencia, "id">;

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

export default {
  getLicencias,
};
