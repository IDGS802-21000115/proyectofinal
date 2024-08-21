import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MateriaPrima } from '../../../interfaces/materiaPrima';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-materia-prima',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './materia-prima.component.html',
  styleUrl: './materia-prima.component.css'
})
export class MateriaPrimaComponent implements OnInit {
  materiasPrimas: MateriaPrima[] = [];
  materiaPrimaForm: FormGroup;
  currentMateria: MateriaPrima | null = null;
  isEditing: boolean = false;
  isFormVisible: boolean = false;
  estatusFilter = 1;

  constructor(
    private fb: FormBuilder,
    private materiaPrimaService: MateriaPrimaService,
    private cdr: ChangeDetectorRef
  ) {
    this.materiaPrimaForm = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      estatus: [1, Validators.required] // Valor predeterminado 'Activo'
    });
  }

  ngOnInit(): void {
    this.loadMateriaPrima();
  }

  loadMateriaPrima(): void {
    this.materiaPrimaService.getMateriaPrimaByEstatus(this.estatusFilter).subscribe({
      next: (data: MateriaPrima[]) => {
        this.materiasPrimas = data;
      },
      error: (err) => console.error('Error al cargar las materias primas', err)
    });
  }

  openCreateForm(): void {
    this.isFormVisible = true; // Muestra el formulario
    this.currentMateria = null;
    this.isEditing = false;
    this.materiaPrimaForm.reset({
      id: 0,
      nombre: '',
      cantidad: '',
      estatus: 1 // Valor predeterminado 'Activo'
    });
  }

  editMateriaPrima(materiaPrima: MateriaPrima): void {
    this.isFormVisible = true; // Muestra el formulario
    this.currentMateria = materiaPrima;
    this.isEditing = true;

    // Rellena el formulario con los valores del proveedor
    this.materiaPrimaForm.patchValue({
      id: materiaPrima.idMateriaPrima,
      nombre: materiaPrima.nombre,
      cantidad: materiaPrima.cantidad,
      estatus: materiaPrima.estatus // Asegúrate de que este valor sea un número
    });
  }

  onSubmit(): void {
    if (this.materiaPrimaForm.invalid) {
        console.error('Formulario inválido. Errores:', this.materiaPrimaForm.errors);
        for (const control in this.materiaPrimaForm.controls) {
            if (this.materiaPrimaForm.controls[control].invalid) {
                console.error(`${control} es inválido`, this.materiaPrimaForm.controls[control].errors);
            }
        }
        return;
    }

    const formValue = this.materiaPrimaForm.value;

    const materiaPrima: MateriaPrima = {
        idMateriaPrima: this.currentMateria?.idMateriaPrima || 0,
        nombre: formValue.nombre,
        cantidad: formValue.cantidad,
        estatus: Number(formValue.estatus)
    };

    if (this.isEditing) {
        console.log('Actualizando materia prima:', materiaPrima);
        this.materiaPrimaService.editMateriaPrima(materiaPrima).subscribe({
          next: (response: string) => {
            console.log('Respuesta del servidor:', response);
            if (response === 'Materia Prima Editada') {
              console.log('Materia Prima actualizado con éxito');
              this.loadMateriaPrima(); // Recargar la tabla
              this.cancel(); // Ocultar el formulario
            } else {
              console.error('Respuesta inesperada del servidor:', response);
            }
          }
          ,
            error: (err) => console.error('Error al actualizar el materia', err)
        });
    } else {
        console.log('Creando materia:', materiaPrima);
        this.materiaPrimaService.createMateriaPrima(materiaPrima).subscribe({
          next: (response) => {
            console.log('Materia prima creada', response);
            this.cancel();
          },
          error: (err) => {
            console.error('Error al crear la materia prima', err);
          }
        });
    }
  }

  deleteMateriaPrima(id: number): void {
    if (id == null) {
      console.error('ID del materia prima es nulo o indefinido');
      return;
    }
  
    this.materiaPrimaService.deleteMateriaPrima(id, this.estatusFilter).subscribe({
      next: (response) => {
        console.log('Materia actualizado a estatus 0', response);
        this.loadMateriaPrima(); // Actualiza la lista de proveedores
      },
      error: (err) => {
        console.error('Error al actualizar el materia', err);
      }
    });
  }

  cancel(): void {
    this.isFormVisible = false; // Oculta el formulario
    this.currentMateria = null;
    this.materiaPrimaForm.reset({
      id: 0,
      nombre: '',
      cantidad: '',
      estatus: 1 // Valor predeterminado 'Activo'
    });
  }
}
