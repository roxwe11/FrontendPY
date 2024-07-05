import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tipos } from 'src/app/core/models/tipos.models';
import { TipoService } from '../../services/tipo.service';
import { VentanatipoComponent } from '../ventanatipo/ventanatipo.component';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {
  tiposList: Tipos[] = [];
  tipo: Tipos = new Tipos(); // Inicializado correctamente como instancia de Tipos
  dialogRef: any;

  constructor(
    private dialog: MatDialog,
    private tipoService: TipoService
  ) {}

  ngOnInit(): void {
    this.listarTipos();
  }

  listarTipos(): void {
    this.tipoService.listarTipos().subscribe({
      next: (resp: Tipos[]) => {
        this.tiposList = resp;
      },
      error: (err: any) => {
        console.error('Error al listar tipos:', err);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VentanatipoComponent, {
      width: '600px',
      height: '400px',
      data: {
        tipo: new Tipos() // Pasamos un nuevo objeto tipo para asegurar que no se modifique directamente
      }
    });

    dialogRef.afterClosed().subscribe((result: Tipos) => {
      console.log('El diálogo se cerró');
      if (result) {
        this.listarTipos();
      }
    });
  }

  deleteItem(item: Tipos): void {
    if (!item || !item.idTipo) {
      console.error('El objeto item es nulo o indefinido, o no tiene un idTipo válido.');
      return;
    }

    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este tipo?');

    if (confirmar) {
      this.tipoService.eliminarTipo(item.idTipo).subscribe({
        next: () => {
          console.log('Tipo eliminado con éxito');
          this.listarTipos();
        },
        error: (err: any) => {
          console.error('Error al eliminar el tipo:', err);
        }
      });
    }
  }

  editItem(item: Tipos): void {
    if (!item || !item.idTipo) {
      console.error('El objeto item es nulo o indefinido, o no tiene un idTipo válido.');
      return;
    }

    this.tipoService.obtenerTipoPorId(item.idTipo).subscribe({
      next: (tipo: Tipos) => {
        if (!tipo) {
          console.error('El objeto tipo obtenido es nulo o indefinido.');
          return;
        }

        const dialogRef = this.dialog.open(VentanatipoComponent, {
          width: '400px',
          data: { tipo: { ...tipo } } // Pasamos una copia del objeto tipo para asegurar que no se modifique directamente
        });

        dialogRef.afterClosed().subscribe((tipoEditado: Tipos) => {
          if (tipoEditado) {
            this.guardarCambios(item.idTipo, tipoEditado);
          } else {
            console.log('Edición cancelada');
          }
        });
      },
      error: (err: any) => {
        console.error('Error al obtener el tipo:', err);
      }
    });
  }

  guardarCambios(idTipo: number, tipoEditado: Tipos): void {
    if (!tipoEditado || !tipoEditado.idTipo) {
      console.error('El objeto tipoEditado es nulo o indefinido, o no tiene un idTipo válido.');
      return;
    }

    this.tipoService.editarTipo(idTipo, tipoEditado).subscribe({
      next: () => {
        console.log('Tipo editado con éxito');
        this.listarTipos();
      },
      error: (err: any) => {
        console.error('Error al editar el tipo:', err);
      }
    });
  }
}
