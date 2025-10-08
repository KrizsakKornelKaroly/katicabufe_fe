import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import axios from 'axios';

interface Category {
  id: number;
  kategoriaNev: string;
}


@Component({
  selector: 'app-categoryList',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  async ngOnInit() {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      this.categories = response.data;

    } catch (error: any ) {
      console.log(error.message);
      alert('Hiba a kategóriák betöltése során');
    }

  }
}
