import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

import { DashboardProcessamentoDiaDTO, DashboardResumoDTO,  DivergenciasPorTributoDTO } from '../../models/dashboard.model';
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
  //data = signal<DashboardVisaoGeralDTO | null>(null);

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

barProcessamentoDiaData: any;
  barProcessamentoDiaOptions: any;

  ngOnInit(): void {
    //this.load();
    this.loadResumo();
    this.loadResumoFake();
    this.configurarGraficoPizza();
    this.loadDivergenciasPorTributo();
    this.configurarBarTributosOptions();
    this.loadProcessamentoUltimosDias(30);
    this.configurarGraficoProcessamentoDia()

    
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

  private loadProcessamentoUltimosDias2(dias: number): void {
    this.dashboardService.getProcessamentoUltimosDias(dias).subscribe({
      next: (dados: DashboardProcessamentoDiaDTO[]) => {
        this.montarGraficoProcessamentoDia(dados);
      },
      error: (err) => {
        console.error('[Dashboard] Erro ao carregar processamento por dia', err);
      }
    });
  }

 private montarGraficoProcessamentoDia(dados: DashboardProcessamentoDiaDTO[]): void {
    const labels = dados.map(d => {
      const date = new Date(d.data);
      return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(date);
    });

    const erros = dados.map(d => d.totalErro);
    const sucessos = dados.map(d => d.totalSucesso);

    this.barProcessamentoDiaData = {
      labels,
      datasets: [
        {
          label: 'Erros',
          data: erros,
          backgroundColor: 'rgba(228,76,76,0.85)', // Vermelho padrão
          borderRadius: 6
        },
        {
          label: 'Sucessos',
          data: sucessos,
          backgroundColor: 'rgba(5,154,210,0.85)', // Azul Avalara
          borderRadius: 6
        }
      ]
    };
  }

  private loadProcessamentoUltimosDias(dias: number): void {
    this.dashboardService.getProcessamentoUltimosDias(dias).subscribe({
      next: (dados) => this.montarGraficoProcessamentoDia(dados),
      error: (err) => console.error('[Dashboard] Erro ao carregar processamento por dia', err)
    });
  }
  private configurarGraficoProcessamentoDia(): void {
    const textColor = '#495057';
    const textColorSecondary = '#6c757d';

    this.barProcessamentoDiaOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx: any) => {
              const valor = ctx.parsed.y ?? 0;
              return `${ctx.dataset.label}: ${valor}`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor
          },
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            precision: 0
          },
          grid: {
            color: '#e0e0e0'
          }
        }
      }
    };
  }

}
