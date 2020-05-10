import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from '../services/category.service';

import { Product } from 'src/app/models/product';
import { Category } from '../models/category';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Observable<Product[]>;
  categories: Observable<Category[]>;

  constructor(private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.categories = this.categoryService.getAll();
  }

  getAllProducts() {
    this.products = this.productService.getAllProducts();
  }

  searchProduct(search: string) {
    this.products = this.productService.searchProductsByName(search);
  }

  filterByCategoryName(filter: string) {
    this.products = this.productService.filterByCategoryName(filter);
  }
}
