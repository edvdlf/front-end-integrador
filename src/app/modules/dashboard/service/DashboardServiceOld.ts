import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DashboardResumoDTO, DashboardVisaoGeralDTO, DistribuicaoTipoDTO, DivergenciasPorTributoDTO, SeriePorDiaDTO } from "../models/dashboard.model";

// dashboard.service.ts
@Injectable({ providedIn: 'root' })
export class DashboardService {
  private api = '/api/dashboard';

  constructor(private http: HttpClient) {}

  getResumo() { return this.http.get<DashboardResumoDTO>(`${this.api}/resumo`); }
  getProcessadosPorDia(dias = 14) {
    return this.http.get<SeriePorDiaDTO[]>(`${this.api}/processados-por-dia`, { params: { dias }});
  }
  getDistribuicaoTipos() {
    return this.http.get<DistribuicaoTipoDTO[]>(`${this.api}/distribuicao-tipos`);
  }
  getDivergenciasPorTributo() {
    return this.http.get<DivergenciasPorTributoDTO[]>(`${this.api}/divergencias-por-tributo`);
  }

  getVisaoGeral(dias = 14) {
  return this.http.get<DashboardVisaoGeralDTO>(`/api/dashboard/visao-geral`, { params: { dias }});
}
}


