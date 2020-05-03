import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { PagesComponent } from './pages/pages.component';

import { HomeComponent } from './pages/home/home.component';

import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            // { path: '', pathMatch: 'full', redirectTo: 'home' }
        ]
    },
    { path: 'index', component: IndexComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'index' }
    // { path: '**', 404 }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });