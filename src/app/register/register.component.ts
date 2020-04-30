import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel = new UserModel();
  remindMe = false;

  constructor(private authService: AuthService, private router: Router ) { }

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

    this.authService.register(this.user).subscribe(response => {
      console.log(response);
      Swal.close();

      if (this.remindMe) {
        localStorage.setItem('email', this.user.email);
      }

      this.router.navigateByUrl('/home');
    }, (error) => {
      Swal.fire({
        title: 'Error al registrarse',
        icon: 'error',
        text: error.error.error.message
      });
    });
  }
}
