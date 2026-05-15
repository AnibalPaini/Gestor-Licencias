import LicenciaModel from "../models/licencia.model.js";
import { LicenciaBody } from "../controllers/licencias.controller.js";
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
      return await LicenciaModel.create(datos);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async put(id: string, datos) {
    try {
    } catch (error) {}
  }
  async delete(id: string) {
    try {
    } catch (error) {}
  }
}
