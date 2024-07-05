import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tipos } from 'src/app/core/models/tipos.models';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-ventanatipo',
  templateUrl: './ventanatipo.component.html',
  styleUrls: ['./ventanatipo.component.css']
})
export class VentanatipoComponent implements OnInit {

  formGroup: FormGroup;
  tipo: Tipos = new Tipos();
  editingMode = false;

  constructor(
    private tipoService: TipoService,
    public dialogRef: MatDialogRef<VentanatipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tipo: Tipos }
  ) {
    if (data && data.tipo && data.tipo.idTipo) {
      // Copia los datos del tipo recibido para evitar modificar directamente los datos del dialogo
      this.tipo = { ...data.tipo };
      this.editingMode = true; // Establece el modo de edición si se recibió un tipo válido
    } else {
      this.tipo = new Tipos(); // Inicializa un nuevo tipo si no se recibió data.tipo
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    // Inicializa el formulario con validaciones y valores actuales del tipo
    this.formGroup = new FormGroup({
      nombreTipo: new FormControl(this.tipo.nombreTipo, [Validators.required]),
      detalleTipo: new FormControl(this.tipo.detalleTipo, [Validators.required])
    });
  }

  send(): void {
    if (this.formGroup.valid) {
      // Actualiza los valores del tipo con los valores del formulario
      this.tipo.nombreTipo = this.formGroup.get('nombreTipo').value;
      this.tipo.detalleTipo = this.formGroup.get('detalleTipo').value;

      if (this.editingMode) {
        // Editar tipo existente
        this.tipoService.editarTipo(this.tipo.idTipo, this.tipo).subscribe(
          response => {
            console.log('Tipo actualizado con éxito:', response);
            this.dialogRef.close(this.tipo);
          },
          error => {
            console.error('Error al editar el tipo:', error);
            if (error.status === 400) {
              console.error('Error 400 - Datos incorrectos:', error.error);
            }
          }
        );
      } else {
        // Crear nuevo tipo
        this.tipoService.guardarTipo(this.tipo).subscribe(
          response => {
            console.log('Tipo guardado con éxito:', response);
            this.dialogRef.close(this.tipo);
          },
          error => {
            console.error('Error al guardar el tipo:', error);
            if (error.status === 400) {
              console.error('Error 400 - Datos incorrectos:', error.error);
            }
          }
        );
      }
    } else {
      console.log('El formulario no es válido');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
