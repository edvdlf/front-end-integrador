import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DashboardResumoDTO, DashboardVisaoGeralDTO, DistribuicaoTipoDTO, DivergenciasPorTributoDTO, SeriePorDiaDTO } from '../models/dashboard.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  //private get baseUrl(): string {
   // return environment.api?.baseUrl ?? '';
  //}

  private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.dashboardUrl;


    

  getResumo() { 
    const url = `${this.baseUrl}/resumo`;
    return this.http.get<DashboardResumoDTO>(url); 
  }


  getProcessadosPorDia(dias = 14) {
    const url = `${this.baseUrl}/processados-por-dia`;
    return this.http.get<SeriePorDiaDTO[]>(url, { params: { dias }});
  }
  getDistribuicaoTipos() {
    const url = `${this.baseUrl}/distribuicao-tipos`;
    return this.http.get<DistribuicaoTipoDTO[]>(url);
  }
  getDivergenciasPorTributo() {
    const url = `${this.baseUrl}/divergencias-por-tributo`;
    return this.http.get<DivergenciasPorTributoDTO[]>(url);
  }

  getVisaoGeral(dias = 14) {
    const url = `${this.baseUrl}/api/dashboard/visao-geral`;
  return this.http.get<DashboardVisaoGeralDTO>(url, { params: { dias }});
}

}


