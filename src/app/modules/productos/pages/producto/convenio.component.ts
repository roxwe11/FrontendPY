import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConvenioService } from './../../services/convenio.service';
import { VentanalibroComponent } from '../ventanaproducto/ventanalibro.component';
import { Productos } from 'src/app/core/models/productos.models';

@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.component.html',
  styleUrls: ['./convenio.component.css']
})
export class ConvenioComponent implements OnInit {
  productosList: Productos[] = [];

  constructor(private dialog: MatDialog, private ConvenioService: ConvenioService) { }

  ngOnInit() {
    this.listarProductos();
  }

  listarProductos() {
    this.ConvenioService.listarProductos().subscribe({
      next: (resp: Productos[]) => {
        this.productosList = resp;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VentanalibroComponent, {
      width: '800px',
      height: '500px',
      data: {
        producto: new Productos() // Enviar un nuevo objeto para creación
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarProductos();
      }
    });
  }

  editItem(producto: Productos) {
    const dialogRef = this.dialog.open(VentanalibroComponent, {
      width: '800px',
      height: '500px',
      data: { producto } // Enviar el producto existente para edición
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarProductos();
      }
    });
  }

  deleteItem(producto: Productos) {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este Producto?');
    if (confirmar) {
      this.ConvenioService.eliminarProducto(producto.idProducto).subscribe({
        next: (resp: any) => {
          console.log('Producto eliminado con éxito');
          this.listarProductos(); // Actualiza la lista de productos después de la eliminación
        },
        error: (err: any) => {
          console.error('Error al eliminar el producto', err);
        }
      });
    }
  }
}
