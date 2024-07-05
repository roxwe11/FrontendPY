import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteComponent } from './pages/reporte/reporte.component';

const routes: Routes = [
  {
    path:'',
    component: ReporteComponent ,
    outlet:"child"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
