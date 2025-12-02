import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { UsuarioLocalStorage } from '../../../../core/services/local-storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-topbar',
  imports: [
CommonModule,
MenuModule,

  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {

  private router = inject(Router);

  @Output() toggleSidebar = new EventEmitter<void>();
  
  @Input() usuarioLogado!: UsuarioLocalStorage | null;
  @Output() sair = new EventEmitter<void>();


items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Alterar senha',
        icon: 'pi pi-user-edit',
        command: () => this.abrirPerfil()
      },
      {
        separator: true
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.sair.emit()
      }
    ];
    
  }

  abrirPerfil() {
    // Ação futura: abrir página do perfil
    console.log('Abrir perfil do usuário');
    this.router.navigate(['/alterar-senha']);
  }

}
