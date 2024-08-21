import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Empleado } from '../../../interfaces/empleado';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../../../services/empleado.service';
import { registroEmpleado } from '../../../interfaces/registerEmpleado';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit{
  empleados: Empleado[] = [];
  empleadoForm: FormGroup;
  currentEmpleado: Empleado | null = null;
  isEditing: boolean = false;
  isFormVisible: boolean = false;
  estatusFilter = 1;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private cdr: ChangeDetectorRef
  ) {
    this.empleadoForm = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      nombreUsuario:['', Validators.required],
      contrasenia:['', Validators.required],
      rol:['', Validators.required],
      estatus: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(): void {
    this.empleadoService.getEmpleadosByEstatus(this.estatusFilter).subscribe((data: Empleado[]) => {
      this.empleados = data;
      console.log('Datos recibidos del servidor:', data); // Asegúrate de que los datos se reciban correctamente
    });
  }

  openCreateForm(): void {
    this.isFormVisible = true;
    this.currentEmpleado = null;
    this.isEditing = false;
    this.empleadoForm.reset({
      id: 0,
      nombre: '',
      nombreUsuario:'',
      contrasenia:'',
      rol:'',
      estatus: 1
    });
  }

  editEmpleado(empleado: Empleado): void {
    this.isFormVisible = true;
    this.currentEmpleado = empleado;
    this.isEditing = true;

    this.empleadoForm.patchValue({
      id: empleado.idEmpleado,
      nombre: empleado.nombre,
      nombreUsuario: empleado.nombreUsuario,
      contrasenia: empleado.contrasenia,
      rol: empleado.rol
    });
  }

  onSubmit(): void {
    if (this.empleadoForm.invalid) {
        console.error('Formulario inválido. Errores:', this.empleadoForm.errors);
        for (const control in this.empleadoForm.controls) {
            if (this.empleadoForm.controls[control].invalid) {
                console.error(`${control} es inválido`, this.empleadoForm.controls[control].errors);
            }
        }
        return;
    }

    const formValue = this.empleadoForm.value;

    console.log('Formulario enviado:', formValue);
       
    const empleado: Empleado = {
      idEmpleado: this.currentEmpleado?.idEmpleado || 0,
      nombreUsuario:formValue.nombreUsuario,
      nombre: formValue.nombre,
      contrasenia: formValue.contrasenia,
      rol: formValue.rol
    };

    const addEmpleado: registroEmpleado = {
      usuario:formValue.nombreUsuario,
      nombre: formValue.nombre,
      contrasenia: formValue.contrasenia,
      rol: formValue.rol
    };
    

    if (this.isEditing) {
        console.log('Actualizando empleado:', empleado);
        this.empleadoService.editEmpleado(empleado).subscribe({
            next: (response: string) => {
                if (response === "Empleado Editado") {
                    console.log('Empleado actualizado con éxito');
                    this.loadEmpleados();
                    this.cancel();
                } else {
                    console.error('Respuesta inesperada del servidor:', response);
                }
            },
            error: (err) => console.error('Error al actualizar el empleado', err)
        });
    } else {
        console.log('Creando empleado:', empleado);
        this.empleadoService.createEmpleado(addEmpleado).subscribe({
            next: () => {
                this.loadEmpleados();
                this.cancel();
            },
            error: (err) => console.error('Error al crear el empleado', err)
        });
    }
  }

  deleteEmpleado(id: number): void {
    if (id == null) {
      console.error('ID del empleado es nulo o indefinido');
      return;
    }
  
    this.empleadoService.deleteEmpleado(id, this.estatusFilter).subscribe({
      next: (response) => {
        console.log('Empleado actualizado a estatus 0', response);
        this.loadEmpleados(); // Actualiza la lista de proveedores
      },
      error: (err) => {
        console.error('Error al actualizar el empleado', err);
      }
    });
  }

  cancel(): void {
    this.isFormVisible = false;
    this.currentEmpleado = null;
    this.empleadoForm.reset({
      id: 0,
      nombre: '',
      nombreUsuario: '',
      contrasenia: '',
      rol: '',
      estatus: 1 // Valor predeterminado 'Activo'
    });
  }
}

