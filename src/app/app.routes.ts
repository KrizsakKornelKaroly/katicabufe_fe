import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/categories/list/list.component';
import { TrafficListComponent } from './components/traffic/list/list.component';

export const routes: Routes = [
    {
        path: 'categories',
        component: CategoryListComponent
    },
    {
        path: 'traffic',
        component: TrafficListComponent
    }
       
];
