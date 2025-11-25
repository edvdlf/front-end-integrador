import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

import { DashboardResumoDTO, DashboardVisaoGeralDTO, DivergenciasPorTributoDTO } from '../../models/dashboard.model';
import { SkeletonModule } from 'primeng/skeleton';
import { DashboardService } from '../../service/DashboardService';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    ButtonModule,
    ChartModule,
    SkeletonModule,
   
  ],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage implements OnInit {
  private dashboardService = inject(DashboardService);

  loading = signal<boolean>(true);
  data = signal<DashboardVisaoGeralDTO | null>(null);

  barData: any;
  barOptions: any;

  dashboardResumo: DashboardResumoDTO | undefined  ;

  // PrimeNG Chart.js bindings
  barProcessadosData: any;
  barProcessadosOptions: any;

  pieTiposData: any;
  pieTiposOptions: any;

  barTributosData: any;
  barTributosOptions: any;
 totalProcessados: 123 | undefined;

   totalNfe = 120;
totalNfse = 80;
totalCte = 40;

pieData: any;
pieOptions: any;

  ngOnInit(): void {
    //this.load();
    this.loadResumo();
     this.loadResumoFake();
      this.configurarGraficoPizza();
      this.loadDivergenciasPorTributo();
    this.configurarBarTributosOptions();

    
  }
 
  

private loadResumo(): void {
    //this.loading = true;
    //this.errorMsg = '';

    this.dashboardService.getDashboardResumo().subscribe({
      next: (data) => {
        this.dashboardResumo = data;
        //this.loading = false;
        console.log('Resumo recebido:', this.dashboardResumo);

      this.configurarGrafico(); 
      },
      error: (err) => {
        console.error('[DashboardResumo] Erro ao carregar resumo da Dashboard:', err);
     //   //this.errorMsg = 'Não foi possível carregar a lista de usuários.';
        //this.loading = false;
      }
    });
  }

 private loadDivergenciasPorTributo(): void {
    this.dashboardService.getDivergenciasPorTributo().subscribe({
      next: (data: DivergenciasPorTributoDTO[]) => {
        const labels = data.map(d => d.tributo);
        const values = data.map(d => d.quantidade);

        this.barTributosData = {
          labels,
          datasets: [
            {
              label: 'Divergências por tributo',
              data: values
              // se quiser, depois você ajusta cores via options/css
            }
          ]
        };
      },
      error: (err) => {
        console.error('[Dashboard] Erro ao carregar divergências por tributo', err);
      }
    });
  }


private loadResumoFake(): void {
  // Aqui futuramente você vai chamar o serviço real
  this.totalNfe = 120;
  this.totalNfse = 80;
  this.totalCte = 40;
}

 
  configurarGrafico(): void {
    this.barData = {
      labels: [
        'Recuperados',
        'Processados',
        'Com erro',
        'Confrontados',
        'Sem divergências',
        'Com divergências'
      ],
      datasets: [
        {
          label: 'Quantidade',
          data: [
            this.dashboardResumo?.totalRecuperados ?? 0,
            this.dashboardResumo?.totalProcessados ?? 0,
            this.dashboardResumo?.totalProcessadosErro ?? 0,
            this.dashboardResumo?.totalConfontos ?? 0,
            this.dashboardResumo?.totalConfontosSemDivergencia ?? 0,
            this.dashboardResumo?.totalConfontosComDivergencia ?? 0
          ],
          backgroundColor: [
            '#315cde', // azul (recuperados)
            '#1a9b4d', // verde (processados)
            '#e45757', // vermelho (erro)
            '#f2c233', // amarelo (confrontados)
            '#1a9b4d', // verde (sem divergências)
            '#e45757'  // vermelho (com divergências)
          ],
          borderWidth: 0
        }
      ]
    };

    this.barOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (ctx: any) => ` ${ctx.parsed.y} documentos`
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12
            }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 50
          }
        }
      }
    };
  }

private configurarGraficoPizza(): void {
  this.pieData = {
    labels: ['NFE', 'NFSE', 'CTE'],
    datasets: [
      {
        data: [this.totalNfe, this.totalNfse, this.totalCte],
        backgroundColor: ['#42A5F5', '#FFA726', '#66BB6A'], // cores padrões
        hoverBackgroundColor: ['#64B5F6', '#FFB74D', '#81C784']
      }
    ]
  };

  this.pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };
}

private configurarBarTributosOptions(): void {
    this.barTributosOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          ticks: { color: '#666' },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#666' },
          grid: { color: '#ddd' }
        }
      }
    };
  }

}

  

 

 






/*
  private prepareCharts(d: DashboardVisaoGeralDTO) {
    const brand =
      getComputedStyle(document.documentElement).getPropertyValue('--vt-orange')?.trim() ||
      '#E1742E';

    // ---- Bar: processados por dia
    const labels1 = d.processadosPorDia.map((x) => x.dia);
    const series1 = d.processadosPorDia.map((x) => x.quantidade);

    this.barProcessadosData = {
      labels: labels1,
      datasets: [
        {
          label: 'Processados',
          data: series1,
          borderWidth: 1,
          backgroundColor: brand,
          borderColor: brand,
        },
      ],
    };

    this.barProcessadosOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
        title: { display: true, text: 'Documentos processados por dia' },
      },
      scales: {
        x: { ticks: { autoSkip: true, maxTicksLimit: 14 } },
        y: { beginAtZero: true },
      },
    };

    // ---- Pie: distribuição por tipo
    const labels2 = d.distribuicaoTipos.map((x) => x.tipoDocumento);
    const series2 = d.distribuicaoTipos.map((x) => x.quantidade);

    this.pieTiposData = {
      labels: labels2,
      datasets: [
        {
          data: series2,
          // sem cores fixas -> Chart escolherá; se quiser, adicione suas cores aqui
        },
      ],
    };

    this.pieTiposOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Distribuição por tipo' },
      },
    };

    // ---- Bar: divergências por tributo
    const labels3 = d.divergenciasPorTributo.map((x) => x.tributo);
    const series3 = d.divergenciasPorTributo.map((x) => x.quantidade);

    this.barTributosData = {
      labels: labels3,
      datasets: [
        {
          label: 'Divergências',
          data: series3,
          borderWidth: 1,
          backgroundColor: brand,
          borderColor: brand,
        },
      ],
    };

    this.barTributosOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Divergências por tributo' },
      },
      scales: {
        x: { ticks: { autoSkip: false } },
        y: { beginAtZero: true },
      },
    };
  }

  get totalProcessados(): number {
    return this.data()?.resumo.totalProcessados ?? 0;
  }

  get totalDivergencias(): number {
    return this.data()?.resumo.totalDivergencias ?? 0;
  }

  get generatedAt(): string {
    return this.data()?.generatedAt ?? '';
  }
    */
//}
