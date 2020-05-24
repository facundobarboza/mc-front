import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from '../services/category.service';

import { Product } from 'src/app/models/product';
import { Category } from '../models/category';

import { CartService } from '../services/cart.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  categories: Category[];
  categoryName: string;
  categorySelect: any = { name: '' };

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryName = this.activatedRoute.snapshot.params.categoryname;
    if (this.categoryName) {
      this.filterByCategoryName(this.categoryName);
    } else {
      this.getAllProducts();
    }
    this.getAllCategories();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response: any) => {
      this.products = response;
    });
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((response: any) => {
      this.categories = response;
      this.categorySelect = this.categories.find((category: any) => category.name == this.categoryName);
    });
  }

  searchProduct(search: string) {
    this.productService.searchProductsByName(search).subscribe((response: any) => {
      this.products = response;
    });
  }

  filterByCategoryName(filter: string) {
    if (filter) {
      this.productService.filterByCategoryName(filter).subscribe((response: any) => {
        this.products = response;
      });
    }
    else {
      this.getAllProducts();
    }
  }

  detail(product: Product) {
    this.router.navigate(['/product', product.id]);
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
