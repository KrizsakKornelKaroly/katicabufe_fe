import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER = "http://localhost:3000";

  constructor() { }


  async selectAll(table: string) {
    try {
      const response = await axios.get(`${this.SERVER}/${table}`);
      return response.data;

    } catch (error: any ) {
      console.log(error.message);
      return {message: 'Hiba történt az adatok elérésekor!'}; 
    }

  }

  select() {}

  insert() {}

  update() {}

  delete() {}

  deleteAll() {}
}
