import { Injectable, Inject } from '@angular/core';
import { HandleErrorService } from '../../@base/services/handle-error.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { RutaViewModel } from '../Models/ruta-add-request';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

    baseUrl: string;
    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
        private handleErrorService: HandleErrorService) {
        this.baseUrl = baseUrl;
    }

    post(credito: RutaViewModel): Observable<RutaViewModel> {
        return this.http.post<RutaViewModel>(this.baseUrl + 'api/Rutas', credito)
            .pipe(
                tap(_ => this.handleErrorService.log('datos enviados')),
                catchError(this.handleErrorService.handleError<RutaViewModel>('Registrar Ruta', null))
            );
    }

    get(): Observable<RutaViewModel[]> {
        return this.http.get<RutaViewModel[]>(this.baseUrl + 'api/Rutas')
            .pipe(
                tap(_ => this.handleErrorService.log('datos enviados')),
                catchError(this.handleErrorService.handleError<RutaViewModel[]>('Consulta Rutas', null))
            );
    }

    getByIdentificacion(identificacion: string): Observable<RutaViewModel> {
        return this.http.get<RutaViewModel>(this.baseUrl + 'api/Rutas/' + identificacion)
            .pipe(
                tap(_ => this.handleErrorService.log('datos enviados')),
                catchError(this.handleErrorService.handleError<RutaViewModel>('Consulta de Ruta por Identificacion', null))
            );
    }
}
