import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Category } from '../../../interfaces/category';
import { ApiResponse } from '../../../interfaces/apires';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoryForm',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  id : number | undefined = undefined; 

  newCategory: Category = {
    id: 0,
    kategoriaNev: ''
  }

  allCategories : Category[] = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id) {
      this.api.select('categories', this.id).then((res : ApiResponse) => {
        this.newCategory = res.data[0];
      });
    }
    this.getAllCategories();
  } 

  getAllCategories() {
    this.api.selectAll('categories').then((res : ApiResponse) => {
      this.allCategories = res.data;
    });
  }

  save() {
    if (this.newCategory.kategoriaNev == '') {
      alert('A kategória neve nem lehet üres!');
      return;
    }

    let idx = this.allCategories.findIndex(c => c.kategoriaNev.toLowerCase() == this.newCategory.kategoriaNev.toLowerCase() && this.id != c.id);
    if (idx > -1) {
      alert('Ilyen nevű kategória már létezik!');
      return;
    }
    if(!this.id) {
      this.api.insert('categories', this.newCategory).then((res: ApiResponse) => {
        console.log(res);
        if (res.status === 200) {
          alert(res.message);
          this.newCategory = {
            id: 0,
            kategoriaNev: ''
          };
          this.getAllCategories();
        }
        else
        {
          alert(res.message);
        }
      });
    }
    else {
      this.api.update('categories', this.id, this.newCategory).then((res: ApiResponse) => {
        if (res.status === 200) {
          alert(res.message);
          this.router.navigate(['/categories']);
        }
        else
        {
          alert(res.message);
        }
      });

    }
    

  }

}
