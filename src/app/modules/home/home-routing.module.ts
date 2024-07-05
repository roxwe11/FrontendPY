import { UbicacionModule } from './../ubicacion/ubicacion.module';
import { UsuarioModule } from './../usuarios/usuario.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'welcome',
    loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path:'convenio',
    loadChildren: () => import('../productos/productos.module').then(m => m.ConveniosModule)
  },
  {
    path:'categoria',
    loadChildren: () => import('../categoria/categoria.module').then(m => m.CategoriaModule)
  },

  {
    path:'tipo',
    loadChildren: () => import('../tipos/tipos.module').then(m => m.TiposModule)
  },

  {
    path:'ubicacion',
    loadChildren: () => import('../ubicacion/ubicacion.module').then(m => m.UbicacionModule)
  },
  
  // {
//     path:'crearproyecto',
//     loadChildren: () => import('../proyecto/proyecto.module').then(m => m.ProyectoModule)
// },
// {
//     path:'listarproyecto',
//     loadChildren: () => import('../proyecto/proyecto.module').then(m => m.ProyectoModule)
// },

    {
      path:'usuarios',
      loadChildren: () => import('../usuarios/usuario.module').then(m => m.UsuarioModule)
    },
    {
      path:'ventas',
      loadChildren: () => import('../ventas/ventas.module').then(m => m.VentasModule)
    },
    {
      path:'stock',
      loadChildren: () => import('../stock/stock.module').then(m => m.StockModule)
    },
    {
      path:'reportes',
      loadChildren: () => import('../reportes/reportes.module').then(m => m.ReportesModule)
    },
    {
      path:'configuracion',
      loadChildren: () => import('../configuracion/configuracion.module').then(m => m.ConfiguracionModule)
    },
  {
    path:'**',
    redirectTo:'welcome'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
