import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable()
export class CartService {

  constructor() { }

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
}
