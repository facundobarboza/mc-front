import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => {
    //   this.product$ = this.productService.getById(params['id']);
    // });
    const idPost = this.activatedRoute.snapshot.params.id;
    this.product$ = this.productService.getById(idPost);
  }

  back() {
    window.history.back();
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
