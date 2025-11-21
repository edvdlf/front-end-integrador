import { Component, OnInit } from '@angular/core';
import { UsuarioHeaderComponent } from "../components/usuario-header/usuario-header.component";
import { UsuarioTableComponent } from "../components/usuario-table/usuario-table.component";

import { UsuarioService } from '../service/usuario-service';
import { ProgressSpinner } from "primeng/progressspinner";
import { CommonModule } from '@angular/common';
import { UsuarioResponse } from '../models/usuario.model';
import { UsuarioTabsComponent } from "../components/usuario-tabs/usuario-tabs.component";
import { UsuarioFormComponent } from "../components/usuario-form/usuario-form.component";

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, UsuarioHeaderComponent, UsuarioTabsComponent, UsuarioFormComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit {
  usuarios: UsuarioResponse[] = [];
  loading = false;
  errorMsg = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    //this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.errorMsg = '';

    this.usuarioService.listarTodos().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('[UsuarioComponent] Erro ao carregar usuários:', err);
        this.errorMsg = 'Não foi possível carregar a lista de usuários.';
        this.loading = false;
      }
    });
  }

}
