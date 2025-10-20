import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, Router} from '@angular/router';
import { Customer } from '../../../interfaces/customer';
import { ApiService } from '../../../services/api.service';
import { ApiResponse } from '../../../interfaces/apires';
import { CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customerForm',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class CustomersFormComponent {
  id: number | undefined = undefined;

  newCustomer = {
    id: 0,
    name: ''
  }

  customers: Customer[] = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.api.select('customers', this.id).then((res: ApiResponse) => {
        this.newCustomer = res.data[0];
      });
    }
  }

  getAllCustomers() {
    this.api.selectAll('customers').then((res: ApiResponse) => {
      this.customers = res.data;
    });
  }

  save() {
    if (!this.id){
      this.api.insert('customers', this.newCustomer).then((res: ApiResponse) => {
        if (res.status === 200) {
          alert(res.message);
          this.newCustomer = {
            id: 0,
            name: ''
          };
          this.getAllCustomers();
        }
        else {
          alert(res.message);
        }
      });
    }
    else {
      this.api.update('customers', this.id, this.newCustomer).then((res: ApiResponse) => {
        if (res.status == 200) {
          alert(res.message);
          this.router.navigate(['/customers']);
        }
        else {
          alert(res.message);
        }
      });
    }

  }


}
