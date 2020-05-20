import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CartService } from '../services/cart.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  order: any[];
  forma: FormGroup;
  total: number = 0;
  client: any = {};

  constructor(private router: Router, private formBuilder: FormBuilder, private cartService: CartService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.order = JSON.parse(localStorage.getItem('order'));
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      observation: ['', Validators.required]
    });
  }

  returnTotal() {
    if (this.order && this.order.length > 0) {
      this.total = this.order.reduce((acc, obj, ) => acc + (obj.price * obj.count), 0);
      return this.total;
    }
  }

  returnTotalCount() {
    if (this.order && this.order.length > 0) {
      this.total = this.order.reduce((acc, obj, ) => acc + (obj.count), 0);
      return this.total;
    }
  }

  confirmOrder() {
    if (this.order) {
      localStorage.setItem('order', JSON.stringify(this.order));
      this.router.navigateByUrl('/confirm-order');
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    let modelOrder = {
      order: this.order,
      client: this.client,
      created: new Date()
    }

    Swal.fire({
      title: "Confirmación",
      text: 'Su pedido será enviado y un representante se comunicará con usted para coordinar la entrega.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Enviar'
    }).then((result) => {
      if (result.value) {
        this.cartService.sendOrder(modelOrder)
          .then(response => {
            localStorage.removeItem('productsToCard');
            localStorage.removeItem('order');
            Swal.fire(
              'Muchas gracias!',
              'Su pedido fue enviado con éxito.',
              'success'
            );
            this.router.navigateByUrl('index');
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error al enviar.',
              icon: 'error',
              text: error.message
            });
          });
      }
    });
  }
}
