import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DashboardProcessamentoDiaDTO, DashboardResumoDTO, DistribuicaoTipoDTO, DivergenciasPorTributoDTO} from '../models/dashboard.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.dashboardUrl;

  
  getDashboardResumo(): Observable<DashboardResumoDTO> {
    console.log("Monitorando url no service")
    const url = `${this.baseUrl}/resumo`;
    return this.http.get<DashboardResumoDTO>(url);
  }
  

  getDivergenciasPorTributo(): Observable<DivergenciasPorTributoDTO[]> {
    return this.http.get<DivergenciasPorTributoDTO[]>(
      `${this.baseUrl}/divergencias-por-tributo`
    );
  }

  getProcessamentoUltimosDias(dias: number): Observable<DashboardProcessamentoDiaDTO[]> {
    const params = new HttpParams().set('dias', dias.toString());

    return this.http.get<DashboardProcessamentoDiaDTO[]>(
      `${this.baseUrl}/processados-por-dia`,
      { params }
    );
  }

  getProcessamentoTiposDocumentosTotais(): Observable<DistribuicaoTipoDTO[]> {
    return this.http.get<DistribuicaoTipoDTO[]>(
      `${this.baseUrl}/processados-por-tipo-documento`
    );
  }

 
}






