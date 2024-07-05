import { ConvenioService } from './../../services/convenio.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Productos } from 'src/app/core/models/productos.models';
import { Categorias } from 'src/app/core/models/categorias.models';
import { Ubicaciones } from 'src/app/core/models/ubicaciones.models';
import { Tipos } from 'src/app/core/models/tipos.models';

@Component({
  selector: 'app-ventanalibro',
  templateUrl: './ventanalibro.component.html',
  styleUrls: ['./ventanalibro.component.css']
})
export class VentanalibroComponent implements OnInit {

  producto: Productos;
  formGroup: FormGroup;
  editingMode = false;

  categoriaslist: Categorias[] = [];
  ubicacioneslist: Ubicaciones[] = [];
  tiposlist: Tipos[] = [];

  constructor(
    private dialog: MatDialog,
    private ConvenioService: ConvenioService,
    public dialogRef: MatDialogRef<VentanalibroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Productos }
  ) {
    this.producto = data.producto;
    this.editingMode = !!this.producto.idProducto;

    this.formGroup = new FormGroup({
      nombreProducto: new FormControl(this.producto?.nombreProducto || '', [Validators.required]),
      precioCompra: new FormControl(this.producto?.precioCompra || '', [Validators.required]),
      precioVenta: new FormControl(this.producto?.precioVenta || '', [Validators.required]),
      stock: new FormControl(this.producto?.stock || '', [Validators.required]),
      fechaVencimiento: new FormControl(this.producto?.fechaVencimiento || '', [Validators.required]),
      categoria: new FormControl(this.producto?.categoria?.nombreCategoria || '', [Validators.required]),
      tipo: new FormControl(this.producto?.tipo?.nombreTipo || '', [Validators.required]),
      ubicacion: new FormControl(this.producto?.ubicacion?.nombreUbicacion || '', [Validators.required]),
    });
  }

  ngOnInit() {
    this.listarCategorias();
    this.listarUbicaciones();
    this.listarTipos();
  }

  listarCategorias() {
    this.ConvenioService.listarCategorias().subscribe({
      next: (resp: Categorias[]) => {
        this.categoriaslist = resp;
      },
      error: (err: any) => { console.log(err) }
    });
  }
  
  listarUbicaciones() {
    this.ConvenioService.listarUbicaciones().subscribe({
      next: (resp: Ubicaciones[]) => {
        this.ubicacioneslist = resp;
      },
      error: (err: any) => { console.log(err) }
    });
  }
  
  listarTipos() {
    this.ConvenioService.listarTipos().subscribe({
      next: (resp: Tipos[]) => {
        this.tiposlist = resp;
      },
      error: (err: any) => { console.log(err) }
    });
  }

  saveAndClose(): void {
    if (this.formGroup.valid) {
      this.producto.nombreProducto = this.formGroup.get('nombreProducto').value;
      this.producto.precioCompra = this.formGroup.get('precioCompra').value;
      this.producto.precioVenta = this.formGroup.get('precioVenta').value;
      this.producto.stock = this.formGroup.get('stock').value;
      this.producto.fechaVencimiento = this.formGroup.get('fechaVencimiento').value;
      this.producto.categoria = this.categoriaslist.find(cat => cat.nombreCategoria === this.formGroup.get('categoria').value);
      this.producto.tipo = this.tiposlist.find(tipo => tipo.nombreTipo === this.formGroup.get('tipo').value);
      this.producto.ubicacion = this.ubicacioneslist.find(ubi => ubi.nombreUbicacion === this.formGroup.get('ubicacion').value);

      if (this.editingMode) {
        // Verifica que el ID del producto está definido
        if (this.producto.idProducto !== undefined) {
          this.ConvenioService.editarProducto(this.producto.idProducto, this.producto).subscribe(
            (response) => {
              console.log('Producto editado con éxito:', response);
              this.dialogRef.close(this.producto);
            },
            (error) => {
              console.error('Error al editar el producto:', error);
            }
          );
        } else {
          console.error('Error: idProducto is undefined');
        }
      } else {
        this.ConvenioService.guardarProducto(this.producto).subscribe(
          (response) => {
            console.log('Producto guardado con éxito:', response);
            this.dialogRef.close(this.producto);
          },
          (error) => {
            console.error('Error al guardar el producto:', error);
          }
        );
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
