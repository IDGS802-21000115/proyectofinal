import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IPedido } from '../../../interfaces/pedido';
import { Empleado } from '../../../interfaces/empleado';
import { IProducto } from '../../../interfaces/products';
import { PedidoService } from '../../../services/pedidoAdmin.service';
import { InventarioService } from '../../../services/inventario.service';
import { EmpleadoService } from '../../../services/empleado.service';
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './pedidoAdmin.component.html',
  styleUrl: './pedidoAdmin.component.css'
})
export class PedidoAdminComponent implements OnInit {
  pedidos: IPedido[] = [];
  empleados: Empleado[] = [];
  productos: IProducto[] = [];
  pedidoForm: FormGroup;
  selectedPedido: IPedido | null = null;
  selectedEmpleadoId: number | null = null;
  mensaje: string | null = null;

  constructor(private pedidoService: PedidoService, 
    private productoService: InventarioService,
    private fb: FormBuilder, private empleadoService:EmpleadoService) {
    this.pedidoForm = this.fb.group({
      idCliente: ['', Validators.required],
      idEmpleado: [''],
      Fecha: ['', Validators.required],
      Total: [0, Validators.required],
      Detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadPedidos();
    this.loadEmpleados();
    this.loadProductos(); 
  }

  loadEmpleados(): void {
    const estatus = 1;
    this.empleadoService.getEmpleadosByEstatus(estatus).subscribe(
      (data) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error al cargar empleados', error);
      }
    );
  }

  loadPedidos(): void {
    console.log('Cargando pedidos...'); // Verifica que esta línea se está ejecutando
    this.pedidoService.obtenerTodosPedidos().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); // Verifica los datos recibidos
        this.pedidos = data;
        this.pedidos.forEach(pedido => {
          console.log('Detalles del pedido ${pedido.idPedido}:', pedido.detalles);
        });
      },
      (error) => {
        console.error('Error al cargar pedidos', error);
      }
    );
  }
  
  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar productos', error);
      }
    );
    
  }

  selectPedido(pedido: IPedido): void {
    this.selectedPedido = pedido;
    this.selectedEmpleadoId = null;
  }

  onRegister(): void {
    if (this.pedidoForm.invalid) {
      return;
    }

    const pedido: IPedido = this.pedidoForm.value;
    this.pedidoService.registrarPedido(pedido).subscribe(
      () => {
        this.loadPedidos();
        this.pedidoForm.reset();
      },
      (error) => {
        console.error('Error al registrar pedido', error);
      }
    );
  }

  onAssignEmployee(pedidoId: number): void {
    if (this.selectedEmpleadoId !== null) {
      this.pedidoService.asignarEmpleadoAPedido(pedidoId, this.selectedEmpleadoId).subscribe(
        () => {
          this.loadPedidos();
          alert('Empleado asignado exitosamente');
        },
        (error) => {
          console.error('Error al asignar empleado', error);
          alert('Error al asignar empleado');
        }
      );
    } else {
      alert('Por favor, selecciona un empleado.');
    }
  }

  onProcessOrder(pedidoId: number): void {
    const dto = { idPedido: pedidoId };
    this.pedidoService.procesarPedido(dto).subscribe(
      (response: string) => {
        if (response === 'Pedido procesado exitosamente') {
          this.loadPedidos(); 
          alert(response);
        } else {
          alert('No hay suficiente stock');
        }
      },
      (error) => {
        alert('No hay suficiente stock');
        console.error('No hay suficiente stock', error);
      }
    );
  }

  getProductoNombre(idProducto: number): string {
    const producto = this.productos.find(p => p.idProducto === idProducto);
    return producto ? producto.nombre : 'Desconocido';
  }

}