import { Component } from '@angular/core';
import { RecuperacaoDocumentosHeaderComponent } from "../components/recuperacao-documentos-header/recuperacao-documentos-header.component";
import { RecuperacaoDocumentosTableComponent } from "../components/recuperacao-documentos-table/recuperacao-documentos-table.component";
import { RecuperacaoDocumentosFormComponent } from "../components/recuperacao-documentos-form/recuperacao-documentos-form.component";

@Component({
  selector: 'app-recuperacao-documentos',
  imports: [RecuperacaoDocumentosHeaderComponent, RecuperacaoDocumentosFormComponent],
  templateUrl: './recuperacao-documentos.component.html',
  styleUrl: './recuperacao-documentos.component.scss'
})
export class RecuperacaoDocumentosComponent {

}
