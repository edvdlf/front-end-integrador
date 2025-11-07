import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../components/topbar/topbar/topbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar/sidebar.component';
import { FooterComponent } from '../components/footer/footer/footer.component';
import { MenuService } from '../../core/services/menu';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, SidebarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  collapsed = false;
  constructor(public menu: MenuService) {}
  toggleSidebar() { this.collapsed = !this.collapsed; }

  readonly menuItems = computed(() => this.menu.items());



}
