import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  forma: FormGroup;
  category = new Category;
  categories: Observable<Category[]>;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getAll();
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
      name: ['', Validators.required]
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

    this.categoryService.saveCategory(this.category);
    $('#addCategory').modal('hide');
    $('#editCategory').modal('hide');
  }

  addCategory() {
    this.category = new Category;
    $('#addCategory').modal('show');
  }

  editCategory(product: any) {
    this.category = product;
    $('#editCategory').modal('show');
  }

  deleteCategory(categoryId: any) {
    Swal.fire({
      title: "Atención",
      text: '¿Está seguro de eliminar esta categoria? Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        this.categoryService.deleteById(categoryId)
          .then(response => {
            Swal.fire(
              'Buen trabajo!',
              'Categoria eliminada con éxito.',
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
