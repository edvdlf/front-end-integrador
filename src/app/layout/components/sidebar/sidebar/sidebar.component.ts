import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // NgIf, NgFor, NgClass
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { MenuItem } from '../../../../core/services/menu';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgIcon],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  /** controlado pelo Layout via [collapsed] */
  @Input() collapsed = false;
  @Input() items: MenuItem[] = [];   // <-- sem default com dados

  childIconSize = '18';
  parentIconSize = '20';

  trackByLabel = (_: number, it: any) => it?.label ?? it?.route ?? it?.externalUrl;

  hasChildren(it: any): boolean {
    return Array.isArray(it?.children) && it.children.length > 0;
  }


}
