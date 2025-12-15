import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { DocumentoFiscalConfrontoDTO } from '../../confrontos/models/confronto-models';
import { ErroProcessamentoDTO } from '../models/erro-processamento.model';

@Injectable({
  providedIn: 'root'
})
export class ErrosprocessmentoService {

  private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.errosprocessamento

  constructor(private http: HttpClient) { }

 

  getAllErrosProcessamentos(): Observable<ErroProcessamentoDTO[]> {
    return this.http.get<ErroProcessamentoDTO[]>(
      `${this.baseUrl}/todos`
    );
  }

  deleteErrosProcessamentos(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}
