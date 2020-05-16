import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Product } from '../models/product';
import { Order } from '../models/order';

@Injectable()
export class CartService {
  private orderCollection: AngularFirestoreCollection;

  constructor(private angularFirestore: AngularFirestore) {
    this.orderCollection = angularFirestore.collection<Order>('order');
  }

  addProduct(product: Product) {
    let temp: any = product;
    let productsList = JSON.parse(localStorage.getItem('productsToCard'));

    if (!productsList) { productsList = []; }

    if (productsList && productsList.find((x: any) => x.id === temp.id)) {
      return;
    } else {
      temp.count = 1;
      productsList.push(temp);
      localStorage.setItem('productsToCard', JSON.stringify(productsList));
    }
  }

  deleteProduct(product: Product, index: number) {
    let productsList = JSON.parse(localStorage.getItem('productsToCard'));
    productsList.splice(index, 1);
    localStorage.setItem('productsToCard', JSON.stringify(productsList));
    return productsList;
  }

  productsCount() {
    let productsList = JSON.parse(localStorage.getItem('productsToCard'));
    return productsList ? productsList.length : 0;
  }

  sendOrder(modelOrder: any) {

    console.log('modelOrder', modelOrder);

    let productsIds = [];

    if (modelOrder.order && modelOrder.order.length > 0) {
      modelOrder.order.forEach((product: any) => {
        productsIds.push(product.id);
      });
    }
    console.log('productsIds', productsIds);

    const orderObj = {
      name: modelOrder.client.name,
      surname: modelOrder.client.surname,
      phone: modelOrder.client.phone,
      observation: modelOrder.client.observation ? modelOrder.client.observation : '',
      products: productsIds,
      created: new Date()
    };

    console.log('orderObj', orderObj);
    return this.orderCollection.add(orderObj);
  }
}
