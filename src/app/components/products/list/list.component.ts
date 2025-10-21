import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../interfaces/product';
import { ApiResponse } from '../../../interfaces/apires';

@Component({
  selector: 'app-productsList',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ProductsListComponent {

    constructor(private api : ApiService) { }

    products : Product[] = [];

    async ngOnInit() {
      this.getAllProducts();  
    }


    getAllProducts() {
      this.api.selectAll('products').then((res: ApiResponse) => {
        if(res.status == 200 ) {
          this.products = res.data;
        }
        else {
          alert(res.message);
        }
      });
    }

    delete(id: number) {
      if(confirm('Biztosan törölni szeretnéd a terméket?')) {
        this.api.delete('products', id).then((res: ApiResponse) => {
          if(res.status == 200) {
            alert(res.message);
            this.getAllProducts();
          }
          else {
            alert(res.message);
          }
        });
      }
    }
}