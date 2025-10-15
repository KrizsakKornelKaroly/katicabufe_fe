import { Injectable } from '@angular/core';
import axios from 'axios';
import { ApiResponse } from '../interfaces/apires';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER = "http://localhost:3000";

  constructor() { }


  async selectAll(table: string): Promise<ApiResponse> {
    try {
      const response = await axios.get(`${this.SERVER}/${table}`);
      return {
        status: 200,
        data: response.data
      };

    }
    catch (error: any) {
      console.log(error.message);
      return {
        status: 500,
        message: 'Hiba történt az adatok elérésekor!'
      };
    }

  }

  async select(table: string, id: number): Promise<ApiResponse> {

    try {
      const response = await axios.get(`${this.SERVER}/${table}/${id}`);
      return {
        status: 200,
        data: response.data
      };

    }
    catch (error: any) {
      console.log(error.message);
      return {
        status: 500,
        message: 'Hiba történt az adatok elérésekor!'
      };
    }

  }

  async insert(table: string, data: any) {
    try {
      const response = await axios.post(`${this.SERVER}/${table}`, data);
      return {
        status: 200,
        message: "Rekord hozzáadva!",
        data: response.data  //nem kötelező visszaadni
      };

    }
    catch (error: any) {
      console.log(error.message);
      return {
        status: 500,
        message: 'Hiba történt a művelet során!'
      };
    }
  }

  async update(table: string, id: number, data: any) {
    try {
      const response = await axios.patch(`${this.SERVER}/${table}/${id}`, data);
      return {
        status: 200,
        message: "Rekord módosítva!",
        data: response.data  //nem kötelező visszaadni
      };

    }
    catch (error: any) {
      console.log(error.message);
      return {
        status: 500,
        message: 'Hiba történt a művelet során!'
      };
    }

  }

  async delete(table: string, id: number) {

    try {
      const response = await axios.delete(`${this.SERVER}/${table}/${id}`);
      return {
        status: 200,
        message: "Rekord törölve!"
      };

    }
    catch (error: any) {
      console.log(error.message);
      return {
        status: 500,
        message: 'Hiba történt az adatok elérésekor!'
      };
    }


  }

  async deleteAll(table: string) {
    try {
      const response = await axios.delete(`${this.SERVER}/${table}`);
      return {
        status: 200,
        message: "Összes rekord törölve a táblából!"
      };

    } catch (error: any) {
      console.log(error.message);
      return {
        status: 500,
        message: 'Hiba történt az adatok elérésekor!'
      };
    }
  }
}
