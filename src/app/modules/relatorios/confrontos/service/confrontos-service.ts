import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfrontoDocumentoListaDTO } from '../models/confronto-models';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfrontosService {

   private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.confrontos;

  constructor(private http: HttpClient) { }

  listarTodosAgrupados(): Observable<ConfrontoDocumentoListaDTO[]> {
    return this.http.get<ConfrontoDocumentoListaDTO[]>(
      `${this.baseUrl}/confronto-json/agrupado/divergencias`
    );
  }
  
}
