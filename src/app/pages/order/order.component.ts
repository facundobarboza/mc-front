import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';

declare const $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order = new Order;
  orders: Observable<Order[]>;
  orderDetail: any = {};

  constructor(private cartService: CartService, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.orders = this.cartService.getAll();
  }

  detailOrder(item: any) {
    this.orderDetail = Object.assign({}, item);

    if (this.orderDetail.products && this.orderDetail.products.length > 0) {
      this.orderDetail.total = this.orderDetail.products.reduce((acc, obj, ) => acc + (obj.price * obj.count), 0);
    }

    if (this.orderDetail.products && this.orderDetail.products.length > 0) {
      this.orderDetail.subtotal = this.orderDetail.products.reduce((acc, obj, ) => acc + (obj.count), 0);
    }

    $('#detailOrder').modal('show');
  }
}