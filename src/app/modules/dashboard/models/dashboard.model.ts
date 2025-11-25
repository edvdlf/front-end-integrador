export interface DashboardResumoDTO 
{  

    totalRecuperados: number;
    totalProcessados: number;
    totalConfontos: number;
    totalProcessadosErro: number;
    totalConfontosComDivergencia: number;
    totalConfontosSemDivergencia: number;


}

export interface DistribuicaoTipoDTO 
{ 
    tipoDocumento: 'NFe' | 'CTe' | 'NFSe'; 
    quantidade: number; 
}
export interface DivergenciasPorTributoDTO 
{ tributo: string; 
    quantidade: number; 
}

//export interface DashboardVisaoGeralDTO {
 // resumo: DashboardResumoDTO;
  //processadosPorDia: SeriePorDiaDTO[];
 // distribuicaoTipos: DistribuicaoTipoDTO[];
 // divergenciasPorTributo: DivergenciasPorTributoDTO[];
 // generatedAt: string; // ISO datetime (Instant do backend)
//}
export interface DashboardProcessamentoDiaDTO {
  data: string;        // LocalDateTime em ISO (ex: 2025-11-24T10:15:00)
  totalErro: number;
  totalSucesso: number;
}

