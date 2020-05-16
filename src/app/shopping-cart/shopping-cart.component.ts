import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productsToCard: any[];
  total: number = 0;

  constructor(private router: Router, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.productsToCard = JSON.parse(localStorage.getItem('productsToCard'));
    if (this.productsToCard && this.productsToCard.length > 0) {

      for (let index = 0; index < this.productsToCard.length; index++) {
        this.productsToCard[index].stock = Array(this.productsToCard[index].quantity).map((x, i) => i);
      }
    }
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

  checkValue(count: any, index: any) {
    if (count <= 0) {
      this.productsToCard[index].count = 1;
    } else if (count > this.productsToCard[index].quantity) {
      this.productsToCard[index].count = this.productsToCard[index].quantity;
    }
  }

  confirmOrder() {
    debugger;
    if (this.productsToCard) {
      localStorage.setItem('order', JSON.stringify(this.productsToCard));
      this.router.navigateByUrl('/confirm-order');
    }
  }
}
