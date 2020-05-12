import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

import { Category } from '../models/category';
import { Product } from '../models/product';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  categories: Observable<Category[]>;
  products: Observable<Product[]>;

  constructor(private router: Router, private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getAll();
    this.getAllPrincipal();
  }

  getAllPrincipal() {
    this.products = this.productService.getAllPrincipal();
  }

  detail(productId: string) {
    this.router.navigate(['/product', productId]);
  }
}
