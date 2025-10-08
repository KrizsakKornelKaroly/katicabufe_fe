import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import axios from 'axios';

interface Traffic {
  id: number;
  termek: string;
  vevo: string;
  kategoriaId: number;
  egyseg : string;
  nettoar: number;
  mennyiseg : number;
  kiadva : boolean;
}

@Component({
  selector: 'app-trafficList',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class TrafficListComponent {

  traffic: Traffic[] = [];

  async ngOnInit() {
    try {
      const response = await axios.get('http://localhost:3000/traffic');
      this.traffic = response.data;
      console.log(this.traffic);

    } catch (error: any ) {
      console.log(error.message);
      alert('Hiba a kategóriák betöltése során');
    }

  }

}
