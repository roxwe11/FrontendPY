import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Productos } from 'src/app/core/models/productos.models';
import { Categorias } from 'src/app/core/models/categorias.models';
import { Ubicaciones } from 'src/app/core/models/ubicaciones.models';
import { Tipos } from 'src/app/core/models/tipos.models';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  private productosUrl: string = 'http://localhost:8874/productos';
  private categoriasUrl: string = 'http://localhost:8871/categorias';
  private ubicacionesUrl: string = 'http://localhost:8879/ubicaciones';
  private tiposUrl: string = 'http://localhost:8873/tipos';

  constructor(private http: HttpClient) { }

  listarProductos(): Observable<Productos[]> {
    const url = `${this.productosUrl}/all`;
    return this.http.get<Productos[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  listarCategorias(): Observable<Categorias[]> {
    const url = `${this.categoriasUrl}/all`;
    return this.http.get<Categorias[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  listarUbicaciones(): Observable<Ubicaciones[]> {
    const url = `${this.ubicacionesUrl}/all`;
    return this.http.get<Ubicaciones[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  listarTipos(): Observable<Tipos[]> {
    const url = `${this.tiposUrl}/all`;
    return this.http.get<Tipos[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  guardarProducto(producto: Productos): Observable<Productos> {
    const url = `${this.productosUrl}/create`;
    return this.http.post<Productos>(url, producto).pipe(
      catchError(this.handleError)
    );
  }

  eliminarProducto(idProducto: number): Observable<any> {
    const url = `${this.productosUrl}/delete/${idProducto}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  editarProducto(idProducto: number, productoActualizado: Productos): Observable<any> {
    const url = `${this.productosUrl}/update/${idProducto}`;
    return this.http.put(url, productoActualizado).pipe(
      catchError(this.handleError)
    );
  }

  obtenerProductoPorId(idProducto: number): Observable<Productos> {
    const url = `${this.productosUrl}/${idProducto}`;
    return this.http.get<Productos>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}
