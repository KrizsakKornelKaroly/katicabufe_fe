import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../../interfaces/category';
import { ApiService } from '../../../services/api.service';
import { ApiResponse } from '../../../interfaces/apires';
import { Product } from '../../../interfaces/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productsForm',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class ProductsFormComponent {
  id: number | undefined = undefined;

  newProduct: Product = {
    id: 0,
    termek: '',
    kategoriaId: 0,
    kategoriaNev: '',
    ar: 0,
    egyseg: ''
  }


  categories: Category[] = [];
  products: Product[] = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.api.select('products', this.id).then((res: ApiResponse) => {
        this.newProduct = res.data[0];
      });
    }
    this.getAllCategories();
    this.getAllProducts();

  }


  getAllCategories() {
    this.api.selectAll('categories').then((res: ApiResponse) => {
      this.categories = res.data;
    });
  }

  getAllProducts() {
    this.api.selectAll('products').then((res: ApiResponse) => {
      this.products = res.data;
    });
  }


  save() {
    if (this.newProduct.termek == '' || this.newProduct.kategoriaId <= 0 || this.newProduct.ar <= 0 || this.newProduct.egyseg == '') {
      alert('Minden mező kitöltése kötelező, a szám mezők csak pozitív értéket fogadhatnak el!');
      return;
    }

    let idx = this.products.findIndex(p => p.termek.toLowerCase() == this.newProduct.termek.toLowerCase() && this.id != p.id);
    if (idx > -1) {
      alert('Ilyen nevű termék már létezik!');
      return;
    }

    if (!this.id) {
      this.api.insert('products', this.newProduct).then((res: ApiResponse) => {
        if (res.status == 200) {
          alert(res.message);
          this.newProduct = {
            id: 0,
            termek: '',
            kategoriaId: 0,
            kategoriaNev: '',
            ar: 0,
            egyseg: ''
          };
          this.getAllProducts();
        }
        else {
          alert(res.message);
        }
      });

    }
    else {
      this.api.update('products', this.id, this.newProduct).then((res: ApiResponse) => {
        if (res.status == 200) {
          alert(res.message);
          this.router.navigate(['/products']);
        }
        else {
          alert(res.message);
        }
      });
    }
  }
}
