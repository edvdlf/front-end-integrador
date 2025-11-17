import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CTeResponse } from '../models/cte.model';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CteService {
  

  private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.cte;

   private http = inject(HttpClient);

   getAllCte(): Observable<Array<CTeResponse>> {
    return this.http.get<CTeResponse[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('[NFeService] Erro ao buscar NFSe:', error);
        return throwError(() => error);
      })
    );
}

 

  
}
