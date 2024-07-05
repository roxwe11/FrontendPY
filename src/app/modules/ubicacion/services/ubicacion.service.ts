import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ubicaciones } from 'src/app/core/models/ubicaciones.models';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private url: string = 'http://localhost:8879/ubicaciones'; 

  constructor(private http: HttpClient) { }

  listarUbicaciones(): Observable<Ubicaciones[]> {
    return this.http.get<Ubicaciones[]>(`${this.url}/all`)
      .pipe(catchError(this.handleError));
  }

  guardarUbicacion(ubicacion: Ubicaciones): Observable<any> {
    return this.http.post<Ubicaciones>(`${this.url}/create`, ubicacion, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error) => {
          console.error('Error al guardar la ubicación:', error);
          return throwError(() => new Error('Error al guardar la ubicación'));
        })
      );
  }

  eliminarUbicaciones(idUbicacion: number): Observable<any> {
    const url = `${this.url}/delete/${idUbicacion}`;
    return this.http.delete(url, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  } 

  
  editarUbicaciones(idUbicacion: number, ubicacionEditada: Ubicaciones): Observable<any> {
    const url = `${this.url}/update/${idUbicacion}`;
    console.log('URL para editar:', url, 'Datos enviados para editar:', ubicacionEditada); // Añadir para depuración
    return this.http.put<Ubicaciones>(url, ubicacionEditada, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error) => {
          console.error('Error al editar la ubicación en el servicio:', error);
          return throwError(() => new Error('Error al editar la ubicación'));
        })
      );
  }
  
  

  obtenerUbicacionesPorId(idUbicacion: number): Observable<Ubicaciones> {
    const url = `${this.url}/${idUbicacion}`;
    return this.http.get<Ubicaciones>(url)
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
