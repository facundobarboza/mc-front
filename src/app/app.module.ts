import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routes
import { APP_ROUTING } from './app.routes';

// Services
import { ProductsService } from './services/products.service';

// Components
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './pages/shared/sidebar/sidebar.component';
import { NavbarAdminComponent } from './pages/shared/navbar-admin/navbar-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PagesComponent,
    
    HomeComponent,
    ProductCardComponent,
    
    IndexComponent,
    ProductsComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    NavbarAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
