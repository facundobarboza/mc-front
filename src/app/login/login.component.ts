import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  remindMe = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.remindMe = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.authService.login(this.user)
      .then(response => {
        Swal.close();

        if (this.remindMe) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error al loguearse',
          icon: 'error',
          text: error.message
        });
      });
  }
}
