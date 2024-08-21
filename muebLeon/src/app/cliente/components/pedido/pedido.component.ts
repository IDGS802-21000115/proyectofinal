import { Component, OnInit } from '@angular/core';
import { PedidocService } from '../../../services/pedidoc.service';
import { IPedido } from '../../../interfaces/pedido';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedidos: IPedido[] = [];

  constructor(
    private pedidoService: PedidocService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  async loadPedidos(): Promise<void> {
    // Obtén el ID del cliente desde el localStorage
    const clientId = await this.loginService.getClientId();
    console.log('ID del cliente obtenido:', clientId);
  
    // Llama al servicio para obtener la lista de pedidos
    this.pedidoService.getList().subscribe({
      next: (pedidos) => {
        // Filtra los pedidos según el ID del cliente
        this.pedidos = pedidos.filter(pedido => pedido.idCliente === clientId);
  
        // Muestra los pedidos filtrados en la consola
        console.log('Pedidos filtrados:', this.pedidos);
        
        // Aquí puedes hacer algo con los pedidos filtrados, como actualizarlos en la vista
      },
      error: (err) => {
        console.error('Error al obtener los pedidos:', err);
      }
    });
  }
  
  }