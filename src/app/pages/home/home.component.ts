import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';

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
  categoriesList: Observable<Category[]>;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
    this.categoriesList = this.categoryService.getAll();
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      imgProduct: [''],
      status: ['', Validators.required],
      principal: ['', Validators.required],
      categories: ['', Validators.required],
      quantity: ['', Validators.required],
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
    if (this.image && this.image.name) {
      this.productService.preAddAndUpdatePost(this.product, this.image);
    } else {
      this.productService.editPostById(this.product);
    }
    // Swal.close();
    $('#addProduct').modal('hide');
    $('#editProduct').modal('hide');
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

  deleteProduct(productId: any) {
    Swal.fire({
      title: "Atención",
      text: '¿Está seguro de eliminar este producto? Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteById(productId)
          .then(response => {
            Swal.fire(
              'Buen trabajo!',
              'Producto eliminado con éxito.',
              'success'
            )
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error al eliminar',
              icon: 'error',
              text: error.message
            });
          });
      }
    });
  }
}
