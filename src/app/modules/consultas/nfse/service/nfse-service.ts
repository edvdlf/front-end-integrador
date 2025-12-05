import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { NFSeResponse } from '../models/nfse.model';
import { NFeResponse } from '../../nfe/models/nfe.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NfseService {

   private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.nfse;

   private http = inject(HttpClient);

   getAllNfse(): Observable<NFSeResponse[]> {
    return this.http.get<NFSeResponse[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('[NFeService] Erro ao buscar NFSe:', error);
        return throwError(() => error);
      })
    );
  }

  getPdf(id: number): Observable<Blob> {
    const url = `${this.baseUrl}/${id}/pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }
  
}
