import { Injectable } from '@angular/core';
import axios from 'axios';
import { ApiResponse} from '../interfaces/apires';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER = "http://localhost:3000";

  constructor() { }


  async selectAll(table: string) : Promise<ApiResponse> {
    try {
      const response = await axios.get(`${this.SERVER}/${table}`);
      return {
        status: 200,
        data: response.data
      };

    } 
    catch (error: any) 
    {
      console.log(error.message);
      return {
        status: 500,
        message: 'Hiba történt az adatok elérésekor!' 
      };
    }

  }

  select() { }

  insert() { }

  update() { }

  delete() { }

  deleteAll() { }
}
