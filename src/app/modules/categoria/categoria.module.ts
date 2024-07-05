import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { VentanacategoriaComponent } from './pages/ventanacategoria/ventanacategoria.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from './services/categoria.service';


@NgModule({
  declarations: [
    CategoriasComponent,
    VentanacategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
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
  providers: [CategoriaService] 
})
export class CategoriaModule { }
