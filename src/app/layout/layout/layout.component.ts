import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../components/topbar/topbar/topbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar/sidebar.component';
import { FooterComponent } from '../components/footer/footer/footer.component';
import { MenuService } from '../../core/services/menu';
import { ConfirmDialog } from 'primeng/confirmdialog';

import { routes } from '../../app.routes';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, SidebarComponent, ConfirmDialog],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  usuarioLogado: any = null;

  collapsed = false;
  constructor(
    public menu: MenuService,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  readonly menuItems = computed(() => this.menu.items());

  ngOnInit(): void {
    this.usuarioLogado = this.localStorageService.getUsuarioLogado();
    console.log('Usuário logado: ', this.usuarioLogado);
  }

  logout() {
  this.localStorageService.excluirUsuariosAll();
  this.cookieService.delete('USER_INFO');
  this.router.navigate(['/login']);
  }
}
