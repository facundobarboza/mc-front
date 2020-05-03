import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  image: any = {};
  forma: FormGroup;
  product = new Product;
  products: Observable<Product[]>;

  categoriesList = [
    { id: 1, name: "Alimento" },
    { id: 2, name: "Bebida" },
    { id: 3, name: "Otro" }
  ];

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      imgProduct: ['', Validators.required],
      status: ['', Validators.required],
      categories: ['', Validators.required],
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    // Swal.fire({
    //   allowOutsideClick: false,
    //   icon: 'info',
    //   text: 'Espere por favor...'
    // });
    // Swal.showLoading();

    this.productService.preAddAndUpdatePost(this.product, this.image);
    // Swal.close();
    $('#addProduct').modal('hide');
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  addProduct() {
    this.product = new Product;
    this.image = {};
    $('#addProduct').modal('show');
  }

  editProduct(product: any) {
    this.product = product;
    $('#editProduct').modal('show');
  }
}
