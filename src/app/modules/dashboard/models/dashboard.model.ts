export interface DashboardResumoDTO 
{  

    totalRecuperados: number;
    totalProcessados: number;
    totalConfontos: number;
    totalProcessadosErro: number;
    totalConfontosComDivergencia: number;
    totalConfontosSemDivergencia: number;


}
export interface SeriePorDiaDTO 
{ 
    dia: string; 
    quantidade: number; 
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

export interface DashboardVisaoGeralDTO {
  resumo: DashboardResumoDTO;
  processadosPorDia: SeriePorDiaDTO[];
  distribuicaoTipos: DistribuicaoTipoDTO[];
  divergenciasPorTributo: DivergenciasPorTributoDTO[];
  generatedAt: string; // ISO datetime (Instant do backend)
}


