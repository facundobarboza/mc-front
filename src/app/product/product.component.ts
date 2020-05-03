import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => {
    //   this.product$ = this.productService.getById(params['id']);
    // });
    const idPost = this.activatedRoute.snapshot.params.id;
    this.product$ = this.productService.getById(idPost);
  }

}
