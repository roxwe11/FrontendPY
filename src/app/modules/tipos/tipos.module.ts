import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { TiposRoutingModule } from './tipos-routing.module';
import { TipoComponent } from './pages/tipo/tipo.component';
import { VentanatipoComponent } from './pages/ventanatipo/ventanatipo.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoService } from './services/tipo.service';


@NgModule({
  declarations: [
    TipoComponent,
    VentanatipoComponent
  ],
  imports: [
    CommonModule,
    TiposRoutingModule,
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
  providers: [TipoService]
})
export class TiposModule { }
