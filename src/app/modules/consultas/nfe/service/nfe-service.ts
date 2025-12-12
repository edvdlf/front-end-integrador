import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NFePageResponse, NFeResponse } from '../models/nfe.model';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';

type DateLike = string | Date;

export interface GetNfePageParams {
  startEntryDate: DateLike; // 'YYYY-MM-DD' ou Date
  endEntryDate: DateLike; // 'YYYY-MM-DD' ou Date
  top?: number; // default 10
  skip?: number; // default 0
}

@Injectable({ providedIn: 'root' })
export class NfeService {
  private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.nfe;
  private readonly baseUrlTaxdocs =  environment.api.baseUrl + environment.api.endpoints.taxdocsNfeUrl;

  private http = inject(HttpClient);

  getAllNfe(): Observable<NFeResponse[]> {
    return this.http.get<NFeResponse[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('[NFeService] Erro ao buscar NFSe:', error);
        return throwError(() => error);
      })
    );
  }

  getNfePdf(invoiceKey: string): Observable<Blob> {
    const url = `${this.baseUrlTaxdocs}/${invoiceKey}/pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }

  recuperarDocumentoFiscalById(
    invoiceKey: string
  ): Observable<any> {
    const url = `${this.baseUrlTaxdocs}/${invoiceKey}/xml`;
    return this.http.get<any>(url); 
    
  }
}
