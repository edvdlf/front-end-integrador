import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { NFSeResponse, TaxdocsHealthResponse } from '../models/nfse.model';
import { NFeResponse } from '../../nfe/models/nfe.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NfseService {

   private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.nfse;
    private readonly baseUrlTaxdocs = environment.api.baseUrl + environment.api.endpoints.taxdocsNfseUrl;
    private readonly baseUrlTaxdocsHealth = environment.api.baseUrl + environment.api.endpoints.taxdocsBaseUrl;


   private http = inject(HttpClient);

   getAllNfse(): Observable<NFSeResponse[]> {
    return this.http.get<NFSeResponse[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('[NFeService] Erro ao buscar NFSe:', error);
        return throwError(() => error);
      })
    );
  }

  

 getPdf(processId: string): Observable<Blob> {
  const url = `${this.baseUrlTaxdocs}/${processId}/pdf`;

  return this.http.get(url, {
    responseType: 'blob' as 'blob'
  });
}

  verificarSaudeTaxdocs(): Observable<TaxdocsHealthResponse> {
    return this.http.get<TaxdocsHealthResponse>(`${this.baseUrlTaxdocsHealth}/health`);
  }
  
}
