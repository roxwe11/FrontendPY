import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categorias } from 'src/app/core/models/categorias.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url: string = 'http://localhost:8871/categorias'; 

  constructor(private http: HttpClient) { }

  listarCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(`${this.url}/all`)
      .pipe(catchError(this.handleError));
  }
  
  guardarCategoria(categoria: Categorias): Observable<any> {
    return this.http.post(`${this.url}/create`, categoria, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error) => {
          console.error('Error al guardar la categoría:', error);
          return throwError(() => new Error('Error al guardar la categoría'));
        })
      );
  }

  eliminarCategorias(idCategoria: number): Observable<any> {
    const url = `${this.url}/delete/${idCategoria}`;
    return this.http.delete(url, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  editarCategorias(idCategoria: number, categoriaEditado: Categorias): Observable<any> {
    const url = `${this.url}/update/${idCategoria}`;
    return this.http.put(url, categoriaEditado, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error) => {
          console.error('Error al editar la categoría en el servicio:', error);
          return throwError(() => new Error('Error al editar la categoría'));
        })
      );
  }

  obtenerCategoriasPorId(idCategoria: number): Observable<Categorias> {
    const url = `${this.url}/${idCategoria}`;
    return this.http.get<Categorias>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // El backend devolvió un código de respuesta no exitoso
      console.error(
        `Backend devolvió el código ${error.status}, ` +
        `body fue: ${error.error}`);
    }
    return throwError(() => new Error('Algo salió mal; por favor intenta de nuevo más tarde.'));
  }
}
