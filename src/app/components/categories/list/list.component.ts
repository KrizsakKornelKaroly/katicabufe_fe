import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Category } from '../../../interfaces/category';
import { ApiService } from '../../../services/api.service';
import { ApiResponse } from '../../../interfaces/apires';

@Component({
  selector: 'app-categoryList',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class CategoryListComponent implements OnInit {

  constructor(private api: ApiService) { }

  categories: Category[] = [];

  async ngOnInit() {
    this.getAllCategories();    
  }

  getAllCategories() {
    this.api.selectAll('categories').then((res: ApiResponse) => {
      if (res.status === 200) {
        this.categories = res.data;
      }
      else {
        alert(res.message);
      }
    });
  }

  delete(id: number) {
    if (window.confirm('Biztosan törölni szeretnéd a kategóriát?')) {
      this.api.delete('categories', id).then((res: ApiResponse) => {
        if (res.status == 200) {
          alert(res.message);
          this.getAllCategories();
        }
        else {
          alert(res.message);
        }
      });
    }
  }
}
