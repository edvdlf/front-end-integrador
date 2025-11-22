import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DashboardResumoDTO} from '../models/dashboard.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private readonly baseUrl = environment.api.baseUrl + environment.api.endpoints.dashboardUrl;

   
  
 // getDashboardResumo2(): Observable<DashboardResumoDTO> {
    //const params = new HttpParams().set('dias', dias);

    //return this.http.get<DashboardResumoDTO>(`${this.baseUrl}/visao-geral`, { params });
  //}

  getDashboardResumo(): Observable<DashboardResumoDTO> {
    console.log("Monitorando url no service")
    const url = `${this.baseUrl}/resumo`;
    return this.http.get<DashboardResumoDTO>(url);
  }
  

  //getVisaoGeral(dias: number = 14): Observable<DashboardResumoDTO> {
    //const params = new HttpParams().set('dias', dias);

   // return this.http.get<DashboardResumoDTO>(`${this.baseUrl}/visao-geral`, { params });
 // }


  //getProcessadosPorDia(dias = 14) {
    //const url = `${this.baseUrl}/processados-por-dia`;
   // return this.http.get<SeriePorDiaDTO[]>(url, { params: { dias }});
 // }
  //getDistribuicaoTipos() {
   // const url = `${this.baseUrl}/distribuicao-tipos`;
   // return this.http.get<DistribuicaoTipoDTO[]>(url);
  //}
  //getDivergenciasPorTributo() {
    //const url = `${this.baseUrl}/divergencias-por-tributo`;
    //return this.http.get<DivergenciasPorTributoDTO[]>(url);
 // }

 

 
}






