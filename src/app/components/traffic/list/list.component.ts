import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Traffic } from '../../../interfaces/traffic';
import { ApiService } from '../../../services/api.service';
import { ApiResponse } from '../../../interfaces/apires';

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
    this.getAllTraffic();  
  }

  getAllTraffic() {
    this.api.selectAll('traffic').then((res: ApiResponse) => {
      if(res.status === 200 ) {
        this.traffic = res.data;
      }
      else {
        alert(res.message);
      }
    });
  }

  delete(id: number) {
    if (window.confirm('Biztosan törölni szeretnéd a forgalmi tételt?')) {
      this.api.delete('traffic', id).then((res: ApiResponse) => {
        if (res.status == 200) {
          alert(res.message);
          this.getAllTraffic();
        }
        else {
          alert(res.message);
        }
      });
    }
  }
  

}
