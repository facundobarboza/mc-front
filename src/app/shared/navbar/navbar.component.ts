import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, public cartService: CartService) { }

  ngOnInit(): void {
  }

  productsCount() {
    return this.cartService.productsCount();
  }
}
