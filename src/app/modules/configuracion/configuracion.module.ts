import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { VistaconfigComponent } from './pages/vistaconfig/vistaconfig.component';



@NgModule({
  declarations: [

    VistaconfigComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule
  ]
})
export class ConfiguracionModule { }
