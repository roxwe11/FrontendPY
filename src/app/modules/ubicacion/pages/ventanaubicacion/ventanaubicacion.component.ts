import { UbicacionService } from './../../services/ubicacion.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ubicaciones } from 'src/app/core/models/ubicaciones.models';

@Component({
  selector: 'app-ventanaubicacion',
  templateUrl: './ventanaubicacion.component.html',
  styleUrls: ['./ventanaubicacion.component.css']
})
export class VentanaubicacionComponent implements OnInit  {

  usuario: Ubicaciones = new Ubicaciones();
  formGroup: FormGroup = new FormGroup({});
  ubicacion: Ubicaciones = new Ubicaciones();  // Inicializar ubicacion

  editingMode = false;

  datosGuardados: Ubicaciones[];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private UbicacionService: UbicacionService,
    public dialogRef: MatDialogRef<VentanaubicacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ubicacion: Ubicaciones }
  ) {
    if (data.ubicacion) {
      this.ubicacion = data.ubicacion; // Almacena los datos de 'data.ubicacion' en 'ubicacion'
      this.editingMode = true; // Indica si estamos en modo de edición
    }
  }

  ngOnInit() {
    this.inithiliazerInputs();
  }

  public inithiliazerInputs() {
    this.formGroup = new FormGroup({
      nombreUbicacion: new FormControl(this.ubicacion.nombreUbicacion, [Validators.required])
    });
  
    // Verifica si estamos en modo de edición y actualiza el formulario con los datos de la ubicación
    if (this.editingMode) {
      this.formGroup.setValue({
        nombreUbicacion: this.ubicacion.nombreUbicacion
      });
    }
  }

  public send(): void {
    if (this.formGroup.valid) {
      this.ubicacion.nombreUbicacion = this.formGroup.get('nombreUbicacion')?.value;

      if (this.editingMode) {
        this.UbicacionService.editarUbicaciones(this.ubicacion.idUbicacion, this.ubicacion).subscribe(
          response => {
            this.datosGuardados = response;
            console.log('Ubicación actualizada con éxito:', response);
            this.dialogRef.close(this.ubicacion);
          },
          error => {
            console.error('Error al editar la ubicación:', error);
          }
        );
      } else {
        this.UbicacionService.guardarUbicacion(this.ubicacion).subscribe(
          response => {
            this.datosGuardados = response;
            console.log('Ubicación guardada con éxito:', response);
            this.dialogRef.close(this.ubicacion);
          },
          error => {
            console.error('Error al guardar la ubicación:', error);
          }
        );
      }
    } else {
      console.log('El formulario no es válido');
    }
  }


  

  saveAndClose(): void {
    if (this.formGroup.valid) {
      this.ubicacion.nombreUbicacion = this.formGroup.get('nombreUbicacion')?.value;

      if (this.editingMode) {
        this.UbicacionService.editarUbicaciones(this.ubicacion.idUbicacion, this.ubicacion).subscribe(
          response => {
            console.log('Ubicación actualizada con éxito:', response);
            this.dialogRef.close(this.ubicacion);
          },
          error => {
            console.error('Error al editar la ubicación:', error);
          }
        );
      } else {
        this.UbicacionService.guardarUbicacion(this.ubicacion).subscribe(
          response => {
            console.log('Ubicación guardada con éxito:', response);
            this.dialogRef.close(this.ubicacion);
          },
          error => {
            console.error('Error al guardar la ubicación:', error);
          }
        );
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
