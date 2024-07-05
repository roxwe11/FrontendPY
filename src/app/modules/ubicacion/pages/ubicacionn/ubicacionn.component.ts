import { UbicacionService } from './../../services/ubicacion.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ubicaciones } from 'src/app/core/models/ubicaciones.models';
import { VentanaubicacionComponent } from '../ventanaubicacion/ventanaubicacion.component';

@Component({
  selector: 'app-ubicacionn',
  templateUrl: './ubicacionn.component.html',
  styleUrls: ['./ubicacionn.component.css']
})
export class UbicacionnComponent implements OnInit{
 ubicacionesList: Ubicaciones[] = []; // Cambiado de ubicacioneslist a ubicacionesList
  

  ubicacion: Ubicaciones; // Cambiado de Ubicaciones a ubicacion
  datosGuardados: any;
  dialogRef: any;

  constructor(private dialog:  MatDialog, private router: Router, private UbicacionService: UbicacionService) { }

  
  listarUbicaciones() { 
    this.UbicacionService.listarUbicaciones().subscribe({
      next: (resp: Ubicaciones[]) => {
        this.ubicacionesList = resp;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  ngOnInit() {
    this.listarUbicaciones();
   
    
  }

  // ABRIR LA VENTANA EMERGENTE
  openDialog(): void {
    const dialogRef = this.dialog.open(VentanaubicacionComponent, {
      width: '600px',  // Ajusta el ancho del diálogo
      height: '400px', // Ajusta la altura del diálogo
      data: {
        ubicacion: this.ubicacion
      },
    });
  
    dialogRef.afterClosed().subscribe((result: Ubicaciones) => {
      console.log('El diálogo se cerró');
      if (result) {
        this.listarUbicaciones();
      }
    });
  }
  


//ELIMINAR Ubicacion
  deleteItem(item: any) {
   
  const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta Ubicacion?');

  if (confirmar) {
    this.UbicacionService.eliminarUbicaciones(item.idUbicacion).subscribe({
      next: (resp: any) => {
        console.log('Ubicacion eliminado con éxito');
        // Después de eliminar el libro, actualiza la lista de libros
        this.listarUbicaciones();
      },
      error: (err: any) => {
        console.error('Error al eliminar la Ubicacion', err);
      }
    });
  }
  }

  //EDITAR Ubicacion
  editItem(item: any): void {
    console.log('Editando ítem con ID:', item.idUbicacion); // Añadir para depuración
    this.UbicacionService.obtenerUbicacionesPorId(item.idUbicacion).subscribe({
      next: (ubicacion: Ubicaciones) => {
        const dialogRef = this.dialog.open(VentanaubicacionComponent, {
          width: '600px',
          height: '400px',
          data: { ubicacion: ubicacion }
        });
  
        dialogRef.afterClosed().subscribe((ubicacionEditada: Ubicaciones) => {
          if (ubicacionEditada) {
            this.guardarCambios(ubicacion.idUbicacion, ubicacionEditada);
          } else {
            console.log('Edición cancelada');
          }
        });
      },
      error: (err: any) => {
        console.error('Error al obtener la ubicación', err);
      }
    });
  }
  



  // Función para guardar los cambios en el mismo ID del libro existente
  guardarCambios(idUbicacion: number, ubicacionEditada: Ubicaciones) {
    console.log('Guardando cambios para ID:', idUbicacion, 'con datos:', ubicacionEditada); // Añadir para depuración
    this.UbicacionService.editarUbicaciones(idUbicacion, ubicacionEditada).subscribe({
      next: (resp: any) => {
        console.log('Ubicación editada con éxito');
        this.listarUbicaciones();
      },
      error: (err: any) => {
        console.error('Error al editar la ubicación', err);
      }
    });
  }
  
}
