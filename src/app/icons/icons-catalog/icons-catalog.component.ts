import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { APP_ICONS } from '../../icons/icons.registry'; // ajuste o caminho se necessário

@Component({
  selector: 'app-icons-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  templateUrl: './icons-catalog.component.html',
  styleUrls: ['./icons-catalog.component.scss'],
})
export class IconsCatalogComponent {
  /** termo de busca */
  query = signal('');

  /** último ícone copiado (mostra “Copiado!” por 1.5s) */
  lastCopied = signal<string | null>(null);

  /** todos os ícones disponíveis no registro */
  readonly allIcons: string[] = Object.keys(APP_ICONS);

  /** filtro dinâmico por texto */
  filteredIcons = computed<string[]>(() => {
    const q = this.query().toLowerCase().trim();
    return q ? this.allIcons.filter(n => n.toLowerCase().includes(q)) : this.allIcons;
  });

  async copy(name: string) {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(name);
      } else {
        const ta = document.createElement('textarea');
        ta.value = name;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      this.lastCopied.set(name);
      setTimeout(() => this.lastCopied.set(null), 1500);
    } catch {
      this.lastCopied.set(null);
      alert('Não foi possível copiar. Verifique permissões do navegador.');
    }
  }
}
