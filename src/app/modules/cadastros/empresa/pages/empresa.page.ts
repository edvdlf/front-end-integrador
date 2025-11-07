import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { EmpresaListComponent } from "../components/empresa-list/empresa-list.component";


@Component({
  selector: 'app-empresa',
  standalone:true,
  imports: [EmpresaListComponent],
  templateUrl: './empresa.page.html',
  styleUrl: './empresa.page.scss'
})
export class EmpresaPage {


}
