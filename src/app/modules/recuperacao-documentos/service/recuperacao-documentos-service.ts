import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperacaoDocumentosService {

private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.nfse;
    
    private readonly taxdocsBaseUrl = environment.api.baseUrl + environment.api.endpoints.taxdocsBaseUrl;

    private http = inject(HttpClient);

recuperarDocumentoFiscal(
  tipo: 'NFE' | 'NFSE' | 'CTE',
  options?: {
    start?: Date;
    end?: Date;
    top?: number;
    skip?: number;
  }
): Observable<void> {
  let params = new HttpParams();

  if (options?.start) {
    const startDateOnly = options.start.toISOString().split('T')[0];
    params = params.set('startEntryDate', startDateOnly);
  }

  if (options?.end) {
    const endDateOnly = options.end.toISOString().split('T')[0];
    params = params.set('endEntryDate', endDateOnly);
  }

  const top = options?.top && options.top > 0 && options.top <= 100 ? options.top : 10;
  const skip = options?.skip && options.skip > 0 && options.skip <= 100 ? options.skip : 10;

  params = params.set('$top', top.toString());
  params = params.set('$skip', skip.toString());

  return this.http.get<void>(
    `${this.taxdocsBaseUrl}/recuperar-documento/${tipo}`,
    { params }
  );
}


  
}
