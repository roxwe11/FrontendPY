import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/core/models/categorias.models';
import { CategoriaService } from '../../services/categoria.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VentanacategoriaComponent } from '../ventanacategoria/ventanacategoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categoriasList: Categorias[] = [];
  categoria: Categorias;
  datosGuardados: any;
  dialogRef: any;

  constructor(private dialog: MatDialog, private router: Router, private CategoriaService: CategoriaService) {}

  listarCategorias() {
    this.CategoriaService.listarCategorias().subscribe({
      next: (resp: Categorias[]) => {
        this.categoriasList = resp;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  ngOnInit() {
    this.listarCategorias();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VentanacategoriaComponent, {
      width: '600px',
      height: '400px',
      data: {
        categoria: this.categoria
      },
    });

    dialogRef.afterClosed().subscribe((result: Categorias) => {
      console.log('El diálogo se cerró');
      if (result) {
        this.listarCategorias();
      }
    });
  }

  // ELIMINAR Categoria
  deleteItem(item: any) {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta Categoria?');
    if (confirmar) {
      this.CategoriaService.eliminarCategorias(item.idCategoria).subscribe({
        next: (resp: any) => {
          console.log('Categoria eliminado con éxito');
          this.listarCategorias();
        },
        error: (err: any) => {
          console.error('Error al eliminar la Categoria', err);
        }
      });
    }
  }

  // EDITAR Categoria
  editItem(item: any) {
    console.log('Editando ítem con ID:', item.idCategoria);
    this.CategoriaService.obtenerCategoriasPorId(item.idCategoria).subscribe({
      next: (categoria: Categorias) => {
        const dialogRef = this.dialog.open(VentanacategoriaComponent, {
          width: '600px',
          height: '400px',
          data: { categoria: categoria }
        });

        dialogRef.afterClosed().subscribe((categoriaEditado: Categorias) => {
          if (categoriaEditado) {
            this.guardarCambios(categoria.idCategoria, categoriaEditado);
          } else {
            console.log('Edición cancelada');
          }
        });
      },
      error: (err: any) => {
        console.error('Error al obtener la categoria', err);
      }
    });
  }

  // Función para guardar los cambios en el mismo ID del libro existente
  guardarCambios(idCategoria: number, categoriaEditado: Categorias) {
    console.log('Guardando cambios para ID:', idCategoria, 'con datos:', categoriaEditado);
    this.CategoriaService.editarCategorias(idCategoria, categoriaEditado).subscribe({
      next: (resp: any) => {
        console.log('Categoria editado con éxito');
        this.listarCategorias();
      },
      error: (err: any) => {
        console.error('Error al editar la categoria', err);
      }
    });
  }
}
