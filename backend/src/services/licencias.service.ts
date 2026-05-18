import LicenciaModel from "../models/licencia.model.js";
import {
  LicenciaBody,
  LicenciaUpdateBody,
} from "../controllers/licencias.controller.js";
import { Licencia } from "../types/types.js";

export default class LicenciaService {
  constructor() {}

  async get(): Promise<Licencia[] | null> {
    try {
      return await LicenciaModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getById(id: string): Promise<Licencia | null> {
    try {
      return await LicenciaModel.findById(id);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async post(datos: LicenciaBody): Promise<Licencia | null> {
    try {
      const licenciaData = {
        ...datos,
        fechaAdq: new Date(datos.fechaAdq),
        fechaVenc: new Date(datos.fechaVenc),
      };

      return await LicenciaModel.create(licenciaData);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async put(id: string, datos: LicenciaUpdateBody): Promise<Licencia | null> {
    try {
      const licenciaData = {
        ...datos,

        ...(datos.fechaAdq && {
          fechaAdq: new Date(datos.fechaAdq),
        }),

        ...(datos.fechaVenc && {
          fechaVenc: new Date(datos.fechaVenc),
        }),
      };

      return await LicenciaModel.findByIdAndUpdate(id, licenciaData, {
        returnDocument: "after",
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async delete(id: string): Promise<Licencia | null> {
    try {
      return await LicenciaModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
