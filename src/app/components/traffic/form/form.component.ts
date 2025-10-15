import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Traffic } from '../../../interfaces/traffic';
import { ApiService } from '../../../services/api.service';
import { ApiResponse } from '../../../interfaces/apires';

@Component({
  selector: 'app-trafficForm',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class TrafficFormComponent implements OnInit {
  id : number | undefined = undefined;

  newTraffic: Traffic = {
    id: 0,
    termek: '',
    vevo: '',
    kategoriaNev: '',
    kategoriaId: 0,
    egyseg : '',
    nettoar: 0,
    mennyiseg : 0,
    kiadva : false
  }

  allTraffic: Traffic[] = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id) {
      this.api.select('traffic', this.id).then((res : ApiResponse) => {
        this.newTraffic = res.data[0];
      });
    }
    this.getAllTraffic();
  }


  getAllTraffic() {
    this.api.selectAll('traffic').then((res : ApiResponse) => {
      this.allTraffic = res.data;
    });
  }

  save() {
    if (this.newTraffic.termek == '' || this.newTraffic.vevo == '' || this.newTraffic.kategoriaNev == '' || this.newTraffic.egyseg == '' || this.newTraffic.nettoar <= 0 || this.newTraffic.mennyiseg <= 0 || this.newTraffic.kiadva == null) {
      alert('Minden mező kitöltése kötelező, a szám mezők csak pozitív értéket fogadhatnak el!');
      return;
    }

    if(!this.id) {
      this.api.insert('traffic', this.newTraffic).then((res: ApiResponse) => {
        if (res.status === 200) {
          alert(res.message);
          this.newTraffic = {
            id: 0,
            termek: '',
            vevo: '',
            kategoriaNev: '',
            kategoriaId: 0,
            egyseg : '',
            nettoar: 0,
            mennyiseg : 0,
            kiadva : false
          };
          this.getAllTraffic();
        }
        else{
          alert(res.message);
        }
      });
    }
    else {
      this.api.update('traffic', this.id, this.newTraffic).then((res: ApiResponse) => {
        if (res.status === 200) {
          alert(res.message);
          this.router.navigate(['/traffic']);
        }
        else{
          alert(res.message);
        }
    });
  }

  }

}
