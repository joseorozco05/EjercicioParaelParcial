import { Injectable, Inject } from '@angular/core';
import { HandleErrorService } from '../../@base/services/handle-error.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Tiquete } from '../Models/tiquete';

@Injectable({
  providedIn: 'root'
})
export class TiqueteService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
        private handleErrorService: HandleErrorService
  ) {
    this.baseUrl = baseUrl;
   }

   post(credito: Tiquete): Observable<Tiquete> {
    return this.http.post<Tiquete>(this.baseUrl + 'api/Tiquete', credito)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Tiquete>('Registrar Tiquete', null))
        );
}

get(): Observable<Tiquete[]> {
  return this.http.get<Tiquete[]>(this.baseUrl + 'api/Tiquete')
      .pipe(
          tap(_ => this.handleErrorService.log('datos enviados')),
          catchError(this.handleErrorService.handleError<Tiquete[]>('Consulta Tiquete', null))
      );
}

getByIdentificacion(identificacion: string): Observable<Tiquete> {
  return this.http.get<Tiquete>(this.baseUrl + 'api/Tiquete/' + identificacion)
      .pipe(
          tap(_ => this.handleErrorService.log('datos enviados')),
          catchError(this.handleErrorService.handleError<Tiquete>('Consulta de Tiquete por Identificacion', null))
      );
}

}
