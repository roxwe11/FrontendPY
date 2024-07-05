import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categorias } from 'src/app/core/models/categorias.models';
import { CategoriaService } from '../../services/categoria.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventanacategoria',
  templateUrl: './ventanacategoria.component.html',
  styleUrls: ['./ventanacategoria.component.css']
})
export class VentanacategoriaComponent implements OnInit {

  usuario: Categorias = new Categorias();
  formGroup: FormGroup = new FormGroup({});
  categoria: Categorias = new Categorias(); // Inicializa categoria

  editingMode = false;

  datosGuardados: Categorias[];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dialogRef: MatDialogRef<VentanacategoriaComponent>,
    private categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public data: { categoria: Categorias }
  ) {
    if (data.categoria) {
      this.categoria = { ...data.categoria }; // Copia los datos de 'data.categoria' en 'categoria'
      this.editingMode = true; // Indica si estamos en modo de edición
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = new FormGroup({
      nombreCategoria: new FormControl(this.categoria.nombreCategoria, [Validators.required]),
      detalleCategoria: new FormControl(this.categoria.detalleCategoria, [Validators.required])
    });

    // Verifica si estamos en modo de edición y actualiza el formulario con los datos de la categoría
    if (this.editingMode) {
      this.formGroup.patchValue({
        nombreCategoria: this.categoria.nombreCategoria,
        detalleCategoria: this.categoria.detalleCategoria,
      });
    }
  }

  send(): void {
    if (this.formGroup.valid) {
      this.categoria.nombreCategoria = this.formGroup.get('nombreCategoria').value;
      this.categoria.detalleCategoria = this.formGroup.get('detalleCategoria').value;

      if (this.editingMode) {
        if (this.categoria.idCategoria !== undefined) { // Verifica que idCategoria esté definido y no sea undefined
          this.categoriaService.editarCategorias(this.categoria.idCategoria, this.categoria).subscribe(
            (response) => {
              console.log('Categoría actualizada con éxito:', response);
              this.dialogRef.close(this.categoria); // Cierra el diálogo y pasa la categoría actualizada
            },
            (error) => {
              console.error('Error al editar la categoría:', error);
            }
          );
        } else {
          console.error('El campo idCategoria no está definido en el objeto categoria.');
        }
      } else {
        this.categoriaService.guardarCategoria(this.categoria).subscribe(
          (response) => {
            console.log('Categoría guardada con éxito:', response);
            this.dialogRef.close(this.categoria); // Cierra el diálogo y pasa la categoría creada
          },
          (error) => {
            console.error('Error al guardar la categoría:', error);
          }
        );
      }
    } else {
      console.log('El formulario no es válido');
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Cierra la ventana emergente
  }

}
