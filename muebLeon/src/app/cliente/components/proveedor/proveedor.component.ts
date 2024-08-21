import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../../services/proveedor.service';
import { Proveedor } from '../../../interfaces/proveedor';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedorForm: FormGroup;
  currentProveedor: Proveedor | null = null;
  isEditing: boolean = false;
  isFormVisible: boolean = false;
  estatusFilter = 1;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef
  ) {
    this.proveedorForm = this.fb.group({
      id: [0],
      nombreProveedor: ['', Validators.required],
      descripcion: ['', Validators.required],
      telefono: ['', Validators.required],
      estatus: [1, Validators.required] // Valor predeterminado 'Activo'
    });
  }

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.proveedorService.getProveedoresByEstatus(this.estatusFilter).subscribe((data: Proveedor[]) => {
      this.proveedores = data;
    });
  }

  openCreateForm(): void {
    this.isFormVisible = true; // Muestra el formulario
    this.currentProveedor = null;
    this.isEditing = false;
    this.proveedorForm.reset({
      id: 0,
      nombreProveedor: '',
      descripcion: '',
      telefono: '',
      estatus: 1 // Valor predeterminado 'Activo'
    });
  }

  editProveedor(proveedor: Proveedor): void {
    this.isFormVisible = true; // Muestra el formulario
    this.currentProveedor = proveedor;
    this.isEditing = true;

    // Rellena el formulario con los valores del proveedor
    this.proveedorForm.patchValue({
      id: proveedor.idProveedor,
      nombreProveedor: proveedor.nombreProveedor,
      descripcion: proveedor.descripcion,
      telefono: proveedor.telefono,
      estatus: proveedor.estatus // Asegúrate de que este valor sea un número
    });
  }

  onSubmit(): void {
    if (this.proveedorForm.invalid) {
        console.error('Formulario inválido. Errores:', this.proveedorForm.errors);
        for (const control in this.proveedorForm.controls) {
            if (this.proveedorForm.controls[control].invalid) {
                console.error(`${control} es inválido`, this.proveedorForm.controls[control].errors);
            }
        }
        return;
    }

    const formValue = this.proveedorForm.value;

    const proveedor: Proveedor = {
        idProveedor: this.currentProveedor?.idProveedor || 0,
        nombreProveedor: formValue.nombreProveedor,
        descripcion: formValue.descripcion,
        telefono: formValue.telefono,
        estatus: Number(formValue.estatus),
        compras: this.currentProveedor?.compras || []
    };

    if (this.isEditing) {
        console.log('Actualizando proveedor:', proveedor);
        this.proveedorService.editProveedor(proveedor).subscribe({
            next: (response: string) => {
                if (response === "Proveedor Editado") {
                    console.log('Proveedor actualizado con éxito');
                    this.loadProveedores();
                    this.cancel();
                } else {
                    console.error('Respuesta inesperada del servidor:', response);
                }
            },
            error: (err) => console.error('Error al actualizar el proveedor', err)
        });
    } else {
        console.log('Creando proveedor:', proveedor);
        this.proveedorService.createProveedor(proveedor).subscribe({
            next: () => {
                this.loadProveedores();
                this.cancel();
            },
            error: (err) => console.error('Error al crear el proveedor', err)
        });
    }
  }

  deleteProveedor(id: number): void {
    if (id == null) {
      console.error('ID del proveedor es nulo o indefinido');
      return;
    }
  
    this.proveedorService.deleteProveedor(id, this.estatusFilter).subscribe({
      next: (response) => {
        console.log('Proveedor actualizado a estatus 0', response);
        this.loadProveedores(); // Actualiza la lista de proveedores
      },
      error: (err) => {
        console.error('Error al actualizar el proveedor', err);
      }
    });
  }

  cancel(): void {
    this.isFormVisible = false; // Oculta el formulario
    this.currentProveedor = null;
    this.proveedorForm.reset({
      id: 0,
      nombreProveedor: '',
      descripcion: '',
      telefono: '',
      estatus: 1 // Valor predeterminado 'Activo'
    });
  }
}