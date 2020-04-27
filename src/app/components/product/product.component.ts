import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product = new Product();

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) {

    this.activatedRoute.params.subscribe(params => {
      this.product = this.productsService.getProductById(params['id']);
    });


  }

  ngOnInit(): void {
  }

}
