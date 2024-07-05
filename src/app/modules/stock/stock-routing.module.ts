import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './pages/stocks/stocks.component';

const routes: Routes = [
  {
    path:'',
    component:StocksComponent,
    outlet:"child"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
