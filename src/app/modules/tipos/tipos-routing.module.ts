import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoComponent } from './pages/tipo/tipo.component';

const routes: Routes = [
  {
    path: '',
    component: TipoComponent,
    outlet:"child"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposRoutingModule { }
