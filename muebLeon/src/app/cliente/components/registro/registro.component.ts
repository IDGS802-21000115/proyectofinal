import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { RegistroDto } from '../../../interfaces/dtoRegistro';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      tarjeta: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      codigo: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic here if needed
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const registroDto: RegistroDto = {
      nombre: this.form.value.nombre,
      usuario: this.form.value.usuario,
      contrasenia: this.form.value.contrasenia,
      rol: 'Cliente',
      direccion: this.form.value.direccion,
      tarjeta: this.form.value.tarjeta,
      fechaVencimiento: this.form.value.fechaVencimiento,
      codigo: this.form.value.codigo
    };

    this.clienteService.register(registroDto).subscribe({
      next: (response) => {
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.snackBar.open('Error al registrar', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      }
    });
  }
}
