import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  remindMe = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.authService.register(this.user)
      .then(response => {
        Swal.close();

        if (this.remindMe) {
          localStorage.setItem('email', this.user.email);
        }

        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error al registrarse',
          icon: 'error',
          text: error.message
        });
      });
  }
}
