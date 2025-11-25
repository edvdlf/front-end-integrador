import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfrontoDocumentoListaDTO, DocumentoFiscalConfrontoDTO } from '../models/confronto-models';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfrontosService {

  private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.confrontos;

  constructor(private http: HttpClient) { }

  

  getAllConfrontos(): Observable<DocumentoFiscalConfrontoDTO[]> {
    return this.http.get<DocumentoFiscalConfrontoDTO[]>(
      `${this.baseUrl}/confronto-json/divergencias`
    );
  }

  getAllConfrontosComDivergenciasPorTipo(
    tipo: string
  ): Observable<DocumentoFiscalConfrontoDTO[]> {
    return this.http.get<DocumentoFiscalConfrontoDTO[]>(
      `${this.baseUrl}/confronto-json/divergencias/tipo-documento`,
      {
        params: { tipo }
      }
    );
  }
 
  getAllConfrontosComDivergencias(): Observable<ConfrontoDocumentoListaDTO[]> {
    return this.http.get<ConfrontoDocumentoListaDTO[]>(
      `${this.baseUrl}/confronto-json/agrupado/divergencias`
    );
  }

  getAllConfrontosComDivergenciasAgrupados(): Observable<ConfrontoDocumentoListaDTO[]> {
    return this.http.get<ConfrontoDocumentoListaDTO[]>(
      `${this.baseUrl}/confronto-json/agrupado/divergencias`
    );
  }

  getAllConfrontosComDivergenciasAgrupadosPorTipoDocumento(tipo:string): Observable<ConfrontoDocumentoListaDTO[]> {
    return this.http.get<ConfrontoDocumentoListaDTO[]>(
      `${this.baseUrl}/confronto-json/agrupado/divergencias/tipo-documento`,
      {
        params: { tipo }
      }
    );
  }



}
