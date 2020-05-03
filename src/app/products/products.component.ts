import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }

  searchProduct(search: string) {
    // this.products = this.productsService.searchProductByName(search);
  }

}
