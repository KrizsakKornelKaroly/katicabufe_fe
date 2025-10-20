import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Customer } from '../../../interfaces/customer';
import { ApiService } from '../../../services/api.service';
import { ApiResponse } from '../../../interfaces/apires';

@Component({
  selector: 'app-customerList',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class CustomersListComponent {

  constructor(private api: ApiService) { }

  customers : Customer[] = [];

  async ngOnInit() {
    this.getAllCustomers();  
  }

  getAllCustomers() {
    this.api.selectAll('customers').then((res) => {
        this.customers = res.data;
    });
  }


  delete(id: number) {
    if (window.confirm('Biztosan törölni szeretnéd a vásárlót?')) {
      this.api.delete('customers', id).then((res: ApiResponse) => {
        if (res.status == 200) {
          alert(res.message);
          this.getAllCustomers();
        }
        else {
          alert(res.message);
        }
      });
  }

}

}
