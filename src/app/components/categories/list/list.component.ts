import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import axios from 'axios';
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

constructor(private api : ApiService) { }

  categories: Category[] = [];

  async ngOnInit() {
    this.api.selectAll('categories').then((res: ApiResponse) => {
          if(res.status === 200 ) {
            this.categories = res.data;
          }
          else {
            alert(res.message);
          }
        });
  }

}
