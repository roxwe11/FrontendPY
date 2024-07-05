import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UbicacionnComponent } from './pages/ubicacionn/ubicacionn.component';

const routes: Routes = [
  {
    path: '',
    component: UbicacionnComponent,
    outlet:"child"
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbicacionRoutingModule { }
