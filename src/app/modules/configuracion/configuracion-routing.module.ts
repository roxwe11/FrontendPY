import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaconfigComponent } from './pages/vistaconfig/vistaconfig.component';

const routes: Routes = [
  {
    path: '',
    component: VistaconfigComponent,
    outlet:"child"
  },


  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
