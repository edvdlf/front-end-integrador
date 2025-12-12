import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { localePtBr } from '../../../../shared/locales/calendar-locale';
import { RecuperacaoDocumentosService } from '../../service/recuperacao-documentos-service';

@Component({
  selector: 'app-recuperacao-documentos-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DatePickerModule,
    Toast,
    
  ],
  templateUrl: './recuperacao-documentos-form.component.html',
  styleUrl: './recuperacao-documentos-form.component.scss',
})
export class RecuperacaoDocumentosFormComponent {
  // Form apenas para o período da consulta manual
  consultaForm: FormGroup;

  // Locale do calendário
  ptBR = localePtBr;

  // Loadings individuais dos botões
  loadingNfe = false;
  loadingNfse = false;
  loadingCte = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private recuperacaoDocumentosService: RecuperacaoDocumentosService
  ) {
    this.consultaForm = this.fb.group({
      dataInicial: [null, Validators.required],
      dataFinal: [null, Validators.required],
    });
  }

  // ------------------------------------------------------
  // Clique nos botões de consulta
  // ------------------------------------------------------
  onClickConsulta(tipo: 'NFE' | 'NFSE' | 'CTE'): void {
    const label = this.getTipoLabel(tipo);

    if (!this.validarPeriodo()) {
      return;
    }

    this.confirmationService.confirm({
      header: 'Confirmar execução',
      message: `Deseja realmente executar manualmente a consulta para <b>${label}</b>?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, executar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-sm p-button-danger',
      rejectButtonStyleClass: 'p-button-sm p-button-text',
      accept: () => this.executarConsulta(tipo),
    });
  }

  // ------------------------------------------------------
  // Validação de período (máx. 30 dias)
  // ------------------------------------------------------
  private validarPeriodo(): boolean {
    const { dataInicial, dataFinal } = this.consultaForm.value;

    if (!dataInicial || !dataFinal) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Datas obrigatórias',
        detail: 'Informe a data inicial e a data final.',
      });
      return false;
    }

    const inicio = new Date(dataInicial);
    const fim = new Date(dataFinal);

    if (fim < inicio) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Período inválido',
        detail: 'A data final não pode ser menor que a data inicial.',
      });
      return false;
    }

    const diffMs = fim.getTime() - inicio.getTime();
    const diffDias = diffMs / (1000 * 60 * 60 * 24);

    if (diffDias > 30) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Período muito grande',
        detail: 'O intervalo máximo permitido é de 30 dias.',
      });
      return false;
    }

    return true;
  }

  // ------------------------------------------------------
  // Chamada da API usando as datas selecionadas
  // ------------------------------------------------------
  private executarConsulta(tipo: 'NFE' | 'NFSE' | 'CTE'): void {
    const { dataInicial, dataFinal } = this.consultaForm.value;

    const inicio = new Date(dataInicial);
    inicio.setHours(0, 0, 0, 0);

    const fim = new Date(dataFinal);
    fim.setHours(23, 59, 59, 999);

    const options = {
      start: inicio,
      end: fim,
      top: 10,
      skip: 0,
    };

    this.setLoading(tipo, true);

    this.recuperacaoDocumentosService
      .recuperarDocumentoFiscal(tipo, options)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Consulta enviada',
            detail: `Execução manual para ${this.getTipoLabel(tipo)} iniciada com sucesso.`,
          });
          this.setLoading(tipo, false);
        },
        error: (err) => {
          console.error('[Taxdocs][Manual] erro ao executar consulta', err);

          let detail = 'Ocorreu um erro ao iniciar a consulta.';
          if (err?.status === 400) {
            detail = 'Requisição inválida. Verifique os parâmetros enviados.';
          } else if (err?.status === 404) {
            detail = 'Endpoint não encontrado. Verifique a configuração da API.';
          } else if (err?.status === 500) {
            detail = 'Erro interno na API Taxdocs/Integrador. Tente novamente em alguns instantes.';
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Erro na consulta',
            detail,
            life: 8000,
          });

          this.setLoading(tipo, false);
        },
      });
  }

  private setLoading(tipo: 'NFE' | 'NFSE' | 'CTE', value: boolean): void {
    switch (tipo) {
      case 'NFE':
        this.loadingNfe = value;
        break;
      case 'NFSE':
        this.loadingNfse = value;
        break;
      case 'CTE':
        this.loadingCte = value;
        break;
    }
  }

  getTipoLabel(tipo: 'NFE' | 'NFSE' | 'CTE'): string {
    switch (tipo) {
      case 'NFE':
        return 'NFe';
      case 'NFSE':
        return 'NFSe';
      case 'CTE':
        return 'CTe';
    }
  }
}
