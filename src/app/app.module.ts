import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { environment } from '../environments/environment';

// Routes
import { APP_ROUTING } from './app.routes';

// Services
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { CartService } from './services/cart.service';

// Components
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './pages/shared/sidebar/sidebar.component';
import { NavbarAdminComponent } from './pages/shared/navbar-admin/navbar-admin.component';
import { Page404Component } from './page404/page404.component';
import { ProfileComponent } from './profile/profile.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { OrderComponent } from './pages/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PagesComponent,

    HomeComponent,
    CategoriesComponent,

    IndexComponent,
    ProductsComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    NavbarAdminComponent,
    Page404Component,
    ProfileComponent,
    ShoppingCartComponent,
    ConfirmOrderComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    APP_ROUTING
  ],
  providers: [
    { provide: BUCKET, useValue: 'gs://mc-front.appspot.com' },
    ProductService,
    CategoryService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
