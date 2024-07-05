import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ConveniosRoutingModule } from './productos-routing.module';
import { ConvenioComponent } from './pages/producto/convenio.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { VentanalibroComponent } from './pages/ventanaproducto/ventanalibro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvenioService } from './services/convenio.service';

@NgModule({
  declarations: [
    ConvenioComponent,
    VentanalibroComponent
  ],
  imports: [
    CommonModule,
    ConveniosRoutingModule,
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
    providers: [ConvenioService]
})
export class ConveniosModule { }
