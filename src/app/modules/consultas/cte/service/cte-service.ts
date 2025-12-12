import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CTeResponse } from '../models/cte.model';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaxdocsHealthResponse } from '../../nfse/models/nfse.model';

@Injectable({
  providedIn: 'root'
})
export class CteService {
  

  private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.cte;
  private readonly baseUrlTaxdocs = environment.api.baseUrl + environment.api.endpoints.taxdocsCteUrl;
    private readonly baseUrlTaxdocsHealth = environment.api.baseUrl + environment.api.endpoints.taxdocsBaseUrl;



   private http = inject(HttpClient);

   getAllCte(): Observable<Array<CTeResponse>> {
    return this.http.get<CTeResponse[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('[NFeService] Erro ao buscar NFSe:', error);
        return throwError(() => error);
      })
    );
}

 getCtePdf(invoiceKey: string): Observable<Blob> {
     const url = `${this.baseUrlTaxdocs}/${invoiceKey}/pdf`;
     return this.http.get(url, { responseType: 'blob' });
}
 
   verificarSaudeTaxdocs(): Observable<TaxdocsHealthResponse> {
     return this.http.get<TaxdocsHealthResponse>(`${this.baseUrlTaxdocsHealth}/health`);
   }

  
}
