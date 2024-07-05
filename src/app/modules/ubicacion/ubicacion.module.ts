import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { UbicacionRoutingModule } from './ubicacion-routing.module';
import { UbicacionnComponent } from './pages/ubicacionn/ubicacionn.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UbicacionService } from './services/ubicacion.service';
import { VentanaubicacionComponent } from './pages/ventanaubicacion/ventanaubicacion.component';


@NgModule({
  declarations: [
    UbicacionnComponent,
    VentanaubicacionComponent
  ],
  imports: [
    CommonModule,
    UbicacionRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [UbicacionService]
})
export class UbicacionModule { }
