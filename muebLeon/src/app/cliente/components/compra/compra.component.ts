import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Compras } from '../../../interfaces/compras';
import { Empleado } from '../../../interfaces/empleado';
import { Proveedor } from '../../../interfaces/proveedor';
import { MateriaPrima } from '../../../interfaces/materiaPrima';
import { CompraService } from '../../../services/compra.service';
import { EmpleadoService } from '../../../services/empleado.service';
import { ProveedorService } from '../../../services/proveedor.service';
import { MateriaPrimaService } from '../../../services/materiaPrima.service';
import { DetalleCompra } from '../../../interfaces/detalleCompras';
import { AuthResponse } from '../../../interfaces/auth-response';
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {
  compras: Compras[] = [];
  compraForm: FormGroup;
  empleados: Empleado[] = [];
  proveedores: Proveedor[] = [];
  materiaPrima: MateriaPrima[] = [];
isEditing: any;
isFormVisible: any;

  constructor(
    private fb: FormBuilder,
    private comprasService: CompraService,
    private empleadoService: EmpleadoService,
    private proveedorService: ProveedorService,
    private materiaPrimaService: MateriaPrimaService,
  ) {
    this.compraForm = this.fb.group({
      fecha: [null, Validators.required],
      idEmpleado: [null, Validators.required],
      idProveedor: [null, Validators.required],
      detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadCompras();
    this.loadEmpleados();
    this.loadProveedores();
    this.loadMateriaPrima();
  }
  getProveedorNombre(idProveedor: number): string {
    const proveedor = this.proveedores.find(p => p.idProveedor === idProveedor);
    return proveedor ? proveedor.nombreProveedor : 'Desconocido';
  }
  getEmpleadoNombre(idEmpleado: number): string {
    const empleado = this.empleados.find(e => e.idEmpleado === idEmpleado);
    return empleado ? empleado.nombre : 'Desconocido';
  }
  get detalleCompras(): FormArray {
    return this.compraForm.get('detalles') as FormArray;
  }

  loadCompras(): void {
    this.comprasService.getCompraByEstatus(1).subscribe(data => {
      this.compras = data;
    });
  }

  loadMateriaPrima(): void {
    this.materiaPrimaService.getMateriaPrimaByEstatus(1) // Ajusta el estatus según sea necesario
      .subscribe(data => {
        this.materiaPrima = data;
      });
  } 

  loadEmpleados(): void {
    this.empleadoService.getEmpleadosByEstatus(1).subscribe(data => {
      this.empleados = data;
    });
  }

  loadProveedores(): void {
    this.proveedorService.getProveedoresByEstatus(1).subscribe(data => {
      this.proveedores = data;
    });
  }

  addDetalle(): void {
    const detalle = this.fb.group({
      idMateriaPrima: [null, Validators.required],
      cantidad: [0, Validators.required],
      subtotal: [0, Validators.required]
    });
    this.detalleCompras.push(detalle);
  }

  removeDetalle(index: number): void {
    this.detalleCompras.removeAt(index);
  }

  onSubmit(): void {
    if (this.compraForm.valid) {
      const compraData = this.compraForm.value;
      const data: Compras = {
        idEmpleado: compraData.idEmpleado,
        idProveedor: compraData.idProveedor,
        fecha: compraData.fecha,
        total: compraData.detalles.reduce((acc: number, detalle: DetalleCompra) => acc + detalle.subtotal, 0),
        detalleCompras: compraData.detalles.map((detalle: any) => ({
          idMateriaPrima: detalle.idMateriaPrima,
          cantidad: detalle.cantidad,
          subtotal: detalle.subtotal
        }))
      };
      this.comprasService.createCompras(data).subscribe({
        next: (response: AuthResponse) => {
          console.log('Respuesta del servidor:', response);
            alert('Compra registrada exitosamente');
        },
        error: (err) => {
          console.error('Error al crear la compra', err);
          alert('Error al crear la compra');
        }
      });
    }
  }
  
  
  getMateriaPrimaNombre(idMateriaPrima: number): string {
    const materiaPrima = this.materiaPrima.find(p => p.idMateriaPrima === idMateriaPrima);
    return materiaPrima ? materiaPrima.nombre : 'Desconocido';
  }

  resetForm(): void {
    this.compraForm.reset({
      fecha: new Date(),
    });
    this.detalleCompras.clear();
  }
}