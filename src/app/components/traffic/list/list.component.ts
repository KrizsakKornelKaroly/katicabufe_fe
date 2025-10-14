import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Traffic } from '../../../interfaces/traffic';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-trafficList',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class TrafficListComponent {

  constructor(private api : ApiService) { }

  traffic: Traffic[] = [];

   async ngOnInit() {
    this.api.selectAll('traffic').then(res => {
      this.traffic = res;
    });
  }

}
