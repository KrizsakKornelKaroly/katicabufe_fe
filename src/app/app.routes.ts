import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/categories/list/list.component';
import { TrafficListComponent } from './components/traffic/list/list.component';
import { TrafficFormComponent } from './components/traffic/form/form.component';
import { CategoryFormComponent } from './components/categories/form/form.component';
import { ProductsListComponent } from './components/products/list/list.component';
import { ProductsFormComponent } from './components/products/form/form.component';
import { CustomersListComponent } from './components/customers/list/list.component';
import { CustomersFormComponent } from './components/customers/form/form.component';
import { PricelistListComponent } from './components/pricelist/list/list.component';

export const routes: Routes = [
    {
        path: 'categories',
        component: CategoryListComponent
    },
    {
        path: 'categoryform',
        component: CategoryFormComponent
    },
    {
        path: 'categoryform/:id',
        component: CategoryFormComponent
    },


    {
        path: 'traffic',
        component: TrafficListComponent
    },
    {
        path: 'trafficform',
        component: TrafficFormComponent
    },
    {
        path: 'trafficform/:id',
        component: TrafficFormComponent
    },


    {
        path: 'products',
        component: ProductsListComponent
    },
    {
        path: 'productsform',
        component: ProductsFormComponent
    },


    {
        path: 'customers',
        component: CustomersListComponent
    },
    {
        path: 'customersform',
        component: CustomersFormComponent
    },
    {
        path: 'customersform/:id',
        component: CustomersFormComponent
    },

    
    {
        path: 'pricelist',
        component: PricelistListComponent
    }
       
];
