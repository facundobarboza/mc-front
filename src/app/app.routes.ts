import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { PagesComponent } from './pages/pages.component';

import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProfileComponent } from './profile/profile.component';

import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'profile', component: ProfileComponent },
            { path: '', pathMatch: 'full', redirectTo: '/index' }
        ]
    },
    { path: '', component: IndexComponent },
    { path: 'index', component: IndexComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:categoryname', component: ProductsComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '404', component: Page404Component },
    { path: '**', pathMatch: 'full', redirectTo: '/404' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });