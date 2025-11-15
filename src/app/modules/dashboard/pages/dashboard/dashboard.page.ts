import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from '../../service/DashboardServiceOld';
import { DashboardVisaoGeralDTO } from '../../models/dashboard.model';
import { SkeletonModule } from 'primeng/skeleton';

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

  // PrimeNG Chart.js bindings
  barProcessadosData: any;
  barProcessadosOptions: any;

  pieTiposData: any;
  pieTiposOptions: any;

  barTributosData: any;
  barTributosOptions: any;

  ngOnInit(): void {
    //this.load();
  }

  private load(): void {
  this.loading.set(true);
  this.dashboardService.getVisaoGeral(14).subscribe({
    next: (res) => {
      console.log('✅ Dados recebidos do serviço:', res);
      this.data.set(res);
      //this.prepareCharts(res);
      this.loading.set(false);
    },
    error: (err) => {
      console.error('❌ Erro ao carregar visão geral:', err);
      this.loading.set(false);
    },
  });
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
}
