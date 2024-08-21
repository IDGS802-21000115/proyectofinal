import { Component, OnInit } from '@angular/core';
import { IProducto } from '../../../interfaces/products';
import { PedidocService } from '../../../services/pedidoc.service';
import { AuthService } from '../../../services/auth.service';
import { IPedido, IPedidoDetalle} from '../../../interfaces/pedido';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'] 
})
export class CarritoComponent implements OnInit {
  productos: IProducto[] = [];
  productosBuscados: IProducto[] = [];
  carritoItems: any[] = [];
  carritoVisible: boolean = false;
  total: number = 0;

  constructor(private muebleService: AuthService, private pedidocService: PedidocService) {}

  ngOnInit(): void {
    this.muebleService.getList().subscribe(
      (data: IProducto[]) => {
        this.productos = data;
        this.productosBuscados = [...data];
        console.log('Products:', this.productos);
        
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  buscarProducto(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.productosBuscados = [...this.productos];
  }

  agregarAlCarritoClicked(producto: IProducto): void {
    console.log('Producto seleccionado:', producto); // Verifica la estructura completa del producto
    console.log('ID del producto seleccionado:', producto.idProducto);
    const item = this.carritoItems.find(i => i.titulo === producto.nombre);
    if (item) {
      alert('El item ya se encuentra en el carrito');
      return;
    }

    this.carritoItems.push({
      idProducto: producto.idProducto,  // Asegúrate de tener un idProducto en tu interfaz
      titulo: producto.nombre,
      precio: producto.precio,
      imagenSrc: producto.imagen,
      cantidad: 1,
      subtotal: producto.precio
    });

    this.carritoVisible = true;
    this.actualizarTotalCarrito();
  }

  restarCantidad(item: any): void {
    if (item.cantidad > 1) {
      item.cantidad--;
      item.subtotal = item.cantidad * item.precio;
      this.actualizarTotalCarrito();
    }
  }

  sumarCantidad(item: any): void {
    item.cantidad++;
    item.subtotal = item.cantidad * item.precio;
    this.actualizarTotalCarrito();
  }

  eliminarItemCarrito(item: any): void {
    this.carritoItems = this.carritoItems.filter(i => i !== item);
    this.actualizarTotalCarrito();
    if (this.carritoItems.length === 0) {
      this.ocultarCarrito();
    }
  }

  ocultarCarrito(): void {
    this.carritoVisible = false;
  }

  actualizarTotalCarrito(): void {
    this.total = this.carritoItems.reduce((acc, item) => acc + item.subtotal, 0);
  }

  pagarClicked(): void {
    const pedido: IPedido = {
      idPedido: 1,
      idCliente: 4,
      idEmpleado: 1, // Usa null si IdEmpleado no es obligatorio
      fecha: '2024-08-16', // Usa ISO string si la API espera DateTime
      total: this.total,
      estatus: "Pendiente", // Usa un valor predeterminado si es necesario
      detalles: this.carritoItems.map(item => ({
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        subtotal: item.subtotal
      }))
    };
    
  
    // Imprimir la fecha y el pedido para depuración
    console.log('Fecha del pedido:', pedido.fecha);
    console.log('Pedido:', pedido);
    
    this.pedidocService.registrarPedido(pedido).subscribe(
      (response) => {
        console.log('Pedido registrado con éxito:', response);
        alert('Gracias por la compra. Pedido registrado con éxito.');
         

        this.carritoItems = [];
        this.actualizarTotalCarrito();
        this.ocultarCarrito();
      },
      (error) => {
        this.generarPDF(pedido);
        console.error('Error registrando el pedido:', error);
        alert(`Pedido Pendiente`);
      }
    );
  }
  
  generarPDF(pedido: IPedido): void {
    const doc = new jsPDF();
    
    // Configurar el título
    doc.setFontSize(18);
    doc.text('Recibo de Compra', 10, 10);
    
    // Configurar la información del pedido
    doc.setFontSize(12);
    doc.text(`Fecha: ${pedido.fecha}`, 10, 20);
    doc.text(`Total: ${pedido.total.toFixed(2)} USD`, 10, 30);
    doc.text('Detalles:', 10, 40);

    // Listar productos en el PDF
    let yPos = 50;
    pedido.detalles.forEach((detalle, index) => {
      doc.text(`${index + 1}. Producto: ${detalle.idProducto}, Precio: ${detalle.subtotal.toFixed(2)} USD`, 10, yPos);
      yPos += 10;
    });

    // Descargar el PDF
    doc.save('recibo_compra.pdf');
  }
}
