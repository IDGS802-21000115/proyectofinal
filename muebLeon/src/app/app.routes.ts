import { Routes, RouterModule } from '@angular/router';


import { NgModule } from '@angular/core';
import { PedidoComponent } from './cliente/components/pedido/pedido.component';
import { LoginComponent } from './cliente/components/login/login.component';
import { RegistroComponent } from './cliente/components/registro/registro.component';
import { ProveedorComponent } from '././cliente/components/proveedor/proveedor.component';
import { MateriaPrimaComponent } from './cliente/components/materia-prima/materia-prima.component';
import { EmpleadoComponent } from './cliente/components/empleado/empleado.component';
import { InventarioComponent } from './cliente/components/inventario/inventario.component';
import { PedidoAdminComponent } from './cliente/components/pedidoAdmin/pedidoAdmin.component';
import { PedidoEmpleadoComponent } from './cliente/components/pedido-empleado/pedido-empleado.component';
import { CompraComponent } from './cliente/components/compra/compra.component';


export const routes: Routes = [
    {path:'homePage',
        loadChildren:()=> import('./homepage/homepage.module').then((m)=>m.HomepageModule)
    },
    {path:'Carrito',
        loadChildren:()=> import('./cliente/cliente.module').then((m)=>m.ClienteModule)
    },
    {path:'Login',
        loadChildren:()=> import('./administrador/administrador.module').then((m)=>m.AdministradorModule)
    },
    {
        path: 'Pedido', // Ruta para el componente Pedido
        component: PedidoComponent, // Usamos component en lugar de loadChildren
    },
    {
        path: 'Loguin', // Ruta para el componente Pedido
        component: LoginComponent, // Usamos component en lugar de loadChildren
    },
    {
        path: 'Registro', // Ruta para el componente Pedido
        component: RegistroComponent, // Usamos component en lugar de loadChildren
    },
    {
        path: 'proveedores', // Ruta para el componente Pedido
        component: ProveedorComponent, // Usamos component en lugar de loadChildren
    },
    {
        path: 'materiaPrima', // Ruta para el componente Pedido
        component: MateriaPrimaComponent, // Usamos component en lugar de loadChildren
    },
    {
        path: 'empleado', // Ruta para el componente Pedido
        component: EmpleadoComponent, // Usamos component en lugar de loadChildren
    },
    {
        path: 'inventario', // Ruta para el componente Pedido
        component: InventarioComponent, // Usamos component en lugar de loadChildren
    },
    {
        path: 'pedidoAdmin', // Ruta para el componente Pedido
        component: PedidoAdminComponent, // Usamos component en lugar de loadChildren
    },
    {
        path: 'pedidoEmpleado', // Ruta para el componente Pedido
        component: PedidoEmpleadoComponent, // Usamos component en lugar de loadChildren
    },
    {
        path: 'compra', // Ruta para el componente Pedido
        component: CompraComponent, // Usamos component en lugar de loadChildren
    },
    {path:'', redirectTo:'/homePage',pathMatch:'full'},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}