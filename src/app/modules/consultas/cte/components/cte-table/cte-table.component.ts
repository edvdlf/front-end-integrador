import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { NFSeResponse } from '../../../nfse/models/nfse.model';
import { CTeResponse } from '../../models/cte.model';

@Component({
  selector: 'app-cte-table',
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
  ],
  templateUrl: './cte-table.component.html',
  styleUrl: './cte-table.component.scss'
})
export class CteTableComponent {

   @Input() data: CTeResponse[] =[];

}
