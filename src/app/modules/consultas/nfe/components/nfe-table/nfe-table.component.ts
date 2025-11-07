import { Component, Input } from '@angular/core';
import { TableModule } from "primeng/table";

import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { NFeResponse } from '../../models/nfe.model';

@Component({
  selector: 'app-nfe-table',
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
  ],
  templateUrl: './nfe-table.component.html',
  styleUrl: './nfe-table.component.scss'
})
export class NfeTableComponent {

  @Input() data: NFeResponse[] =[];

}
