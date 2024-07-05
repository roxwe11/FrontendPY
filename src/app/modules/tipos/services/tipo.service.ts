import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tipos } from 'src/app/core/models/tipos.models';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private url: string = 'http://localhost:8873/tipos'; // Asegúrate de que esta URL sea correcta y que tu backend esté corriendo

  constructor(private http: HttpClient) { }

  // Método para listar todos los tipos
  listarTipos(): Observable<Tipos[]> {
    return this.http.get<Tipos[]>(`${this.url}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para guardar un nuevo tipo
  guardarTipo(tipo: Tipos): Observable<Tipos> {
    return this.http.post<Tipos>(`${this.url}/create`, tipo)
      .pipe(
        catchError((error) => {
          console.error('Error al guardar el tipo:', error);
          return throwError(() => new Error('Error al guardar el tipo'));
        })
      );
  }

  // Método para eliminar un tipo por ID
  eliminarTipo(idTipo: number): Observable<any> {
    const url = `${this.url}/delete/${idTipo}`;
    return this.http.delete(url, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para editar un tipo existente
  editarTipo(idTipo: number, tipoActualizado: Tipos): Observable<Tipos> {
    const url = `${this.url}/update/${idTipo}`;
    return this.http.put<Tipos>(url, tipoActualizado)
      .pipe(
        catchError((error) => {
          console.error('Error al editar el tipo:', error);
          return throwError(() => new Error('Error al editar el tipo'));
        })
      );
  }

  // Método para obtener un tipo por ID
  obtenerTipoPorId(idTipo: number): Observable<Tipos> {
    const url = `${this.url}/${idTipo}`;
    return this.http.get<Tipos>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // El backend devolvió un código de respuesta no exitoso
      console.error(
        `Backend devolvió el código ${error.status}, ` +
        `body fue: ${error.error}`
      );
    }
    return throwError(() => new Error('Algo salió mal; por favor intenta de nuevo más tarde.'));
  }
}
