import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any = {};

  constructor(private router: Router, private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  detail() {
    this.router.navigate(['/product', this.product.id]);
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    Swal.fire({
      icon: 'success',
      title: 'Buen trabajo!',
      text: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
