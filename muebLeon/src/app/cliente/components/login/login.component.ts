import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          /*this.snackBar.open('Registro exitoso', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
          });*/
          if (response.rol == 'admin') {
            this.router.navigate(['/pedidoAdmin']);
          } else if (response.rol == 'empleado') {
            this.router.navigate(['/pedidoEmpleado']);
          } else {
            this.router.navigate(['/Pedido']);
          }
        /*next: (response: AuthResponseDto) => {
          if (response.IsSuccess) {
            // Redirige al cliente si el login es exitoso
            this.router.navigate(['/proveedor'])
              .then(success => {
                if (success) {
                  console.log('Redirigido a /proveedor');
                } else {
                  console.error('No se pudo redirigir');
                }
              });
          } else {
            this.errorMessage = response.Message || 'Login failed';
          }
        },*/
        },error: (err) => {
          this.errorMessage = 'An error occurred during login';
          console.error(err);
        }
      });
    }
  }
}
