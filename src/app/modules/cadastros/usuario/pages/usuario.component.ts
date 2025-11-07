import { Component } from '@angular/core';
import { UsuarioHeaderComponent } from "../components/usuario-header/usuario-header.component";
import { UsuarioTableComponent } from "../components/usuario-table/usuario-table.component";

@Component({
  selector: 'app-usuario',
  imports: [UsuarioHeaderComponent, UsuarioTableComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

}
