import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

import Swal from 'sweetalert2';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productsToCard: any[];
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.productsToCard = JSON.parse(localStorage.getItem('productsToCard'));
  }

  returnTotal() {
    if (this.productsToCard && this.productsToCard.length > 0) {
      this.total = this.productsToCard.reduce((acc, obj, ) => acc + (obj.price * obj.count), 0);
      return this.total;
    }
  }

  returnTotalCount() {
    if (this.productsToCard && this.productsToCard.length > 0) {
      this.total = this.productsToCard.reduce((acc, obj, ) => acc + (obj.count), 0);
      return this.total;
    }
  }

  deleteProduct(product: Product, index: number) {
    Swal.fire({
      title: "Atención!",
      text: 'Está seguro de eliminar este producto? Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.productsToCard = this.cartService.deleteProduct(product, index);
        Swal.fire(
          'Eliminado!',
          'Su producto fue eliminado del carrito.',
          'success'
        )
      }
    });
  }
}
