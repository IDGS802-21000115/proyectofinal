import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import { IProducto } from '../../../interfaces/products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { produccionDto } from '../../../interfaces/produccionDto';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-inventario',
  standalone: true,
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent]
})
export class InventarioComponent implements OnInit {
  productos: IProducto[] = [];
  producto: produccionDto[]=[];
  isFormVisible = false;
  productoForm: FormGroup;
  currentProducto: IProducto | null = null;
  estatusFilter = 1;

  constructor(
    private inventarioService: InventarioService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.productoForm = this.fb.group({
      id: [0],
      cantidad: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadInventario();
  }

  loadInventario(): void {
    this.inventarioService.getInventarioByEstatus(this.estatusFilter).subscribe({
      next: (data: IProducto[]) => {
        this.productos = data;
        this.cdr.detectChanges(); // Asegúrate de que los cambios se detectan correctamente
      },
      error: (err) => console.error('Error al cargar los productos', err)
    });
  }

  openCreateForm(producto: IProducto | null = null): void {
    this.isFormVisible = true;
    this.currentProducto = producto;
    this.productoForm.reset({
        id: producto ? producto.idProducto : 0,
        cantidad: 0
    });
  }
 
  onSubmit(): void {
    if (this.productoForm.invalid) {
        return;
    }

    const formData = this.productoForm.value;
    const productoData: produccionDto = {
        idProducto: formData.id,
        cantidad: formData.cantidad
    };

    this.inventarioService.producirnventario(productoData).subscribe({
        next: () => {
            this.loadInventario(); // Recarga la lista de productos
            this.isFormVisible = false; // Oculta el formulario
        },
        error: (err) => console.error('Error al producir producto', err)
    });
  }
}
