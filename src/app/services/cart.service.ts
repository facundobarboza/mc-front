import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Product } from '../models/product';
import { Order } from '../models/order';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CartService {
  private orderCollection: AngularFirestoreCollection;

  constructor(private angularFirestore: AngularFirestore) {
    this.orderCollection = angularFirestore.collection<Order>('orders');
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
    const orderObj = {
      name: modelOrder.client.name,
      surname: modelOrder.client.surname,
      phone: modelOrder.client.phone,
      observation: modelOrder.client.observation ? modelOrder.client.observation : '',
      products: modelOrder.order,
      created: new Date()
    };
    return this.orderCollection.add(orderObj);
  }

  getAll(): Observable<Order[]> {
    return this.orderCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Order;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
