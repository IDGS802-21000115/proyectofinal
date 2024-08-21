import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IPedido } from '../../../interfaces/pedido';
import { Empleado } from '../../../interfaces/empleado';
import { PedidoService } from '../../../services/pedidoAdmin.service';
import { EmpleadoService } from '../../../services/empleado.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { IProducto } from '../../../interfaces/products';
import { InventarioService } from '../../../services/inventario.service';

@Component({
  selector: 'app-pedido-empleado',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './pedido-empleado.component.html',
  styleUrl: './pedido-empleado.component.css'
})
export class PedidoEmpleadoComponent {
  pedidos: IPedido[] = [];
  productos: IProducto[] = [];
  empleados: Empleado[] = [];
  pedidoForm: FormGroup;
  selectedPedido: IPedido | null = null;
  selectedEmpleadoId: number | null = null;
  mensaje: string | null = null;

  constructor(private pedidoService: PedidoService, private fb: FormBuilder, 
    private empleadoService:EmpleadoService, private productoService: InventarioService) {
    // Inicializa el formulario con campos básicos
    this.pedidoForm = this.fb.group({
      idCliente: ['', Validators.required],
      idEmpleado: [''],
      Fecha: ['', Validators.required],
      Total: [0, Validators.required],
      Detalles: this.fb.array([]) // Aquí puedes agregar más detalles si lo necesitas
    });
  }
  ngOnInit(): void {
    this.loadPedidos();
    this.loadEmpleados();
    this.loadProductos();
  }

  loadEmpleados(): void {
    const estatus = 1; // Cambia esto según la lógica de tu aplicación
    this.empleadoService.getEmpleadosByEstatus(estatus).subscribe(
      (data) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error al cargar empleados', error);
      }
    );
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data;
        console.log(this.productos);
      },
      (error) => {
        console.error('Error al cargar productos', error);
      }
    );
    
  }
  

  onSelectPedido(pedido: IPedido): void {
    this.selectedPedido = pedido;
  }

  onProcessOrder(pedidoId: number): void {
    const dto = { idPedido: pedidoId };
    this.pedidoService.procesarPedido(dto).subscribe(
      (response: string) => {
        if (response === 'Pedido procesado exitosamente') {
          this.loadPedidos(); // Recarga la lista de pedidos
          alert(response); // Muestra el mensaje de éxito
        } else {
          alert(response); // Muestra cualquier otro mensaje recibido
        }
      },
      (error) => {
        // Maneja errores del servidor
        alert(error.error || 'Error desconocido');
        console.error('Error al procesar pedido', error);
      }
    );
  }
  getProductoNombre(idProducto: number): string {
    const producto = this.productos.find(p => p.idProducto === idProducto);
    console.log(producto);
    return producto ? producto.nombre : 'Desconocido';
    
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
}
