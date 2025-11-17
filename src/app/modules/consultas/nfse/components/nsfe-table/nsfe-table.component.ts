import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { NFSeResponse } from '../../models/nfse.model';
import { Tag } from "primeng/tag";
import { Select } from "primeng/select";

@Component({
  selector: 'app-nsfe-table',
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    TooltipModule,
    
    
],
  templateUrl: './nsfe-table.component.html',
  styleUrl: './nsfe-table.component.scss'
})
export class NsfeTableComponent {

   @Input() data: NFSeResponse[] =[];
   @Input() loading = false;




   
   
}
