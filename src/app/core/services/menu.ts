import { Injectable, computed, signal } from '@angular/core';

/** Estrutura do item de menu */
export interface MenuItem {
  /** Texto exibido */
  label: string;
  /** Nome do ícone (ex.: 'heroHome' do ng-icons, 'pi pi-home' do PrimeIcons, etc.) */
  icon?: string;
  /** Rota interna do Angular Router */
  route?: string;
  /** URL externa (abre com target=_blank por padrão no exemplo de uso) */
  externalUrl?: string;
  /** Badge simples (número ou texto) */
  badge?: number | string;
  /** Itens filhos (submenu) */
  children?: MenuItem[];
  /** Campo livre para controle de permissão/role */
  permission?: string | string[];
  /** Marcar como separador de seção */
  separator?: boolean;

   url?: string;

   target?: string;

   type?: string;


}

const DEFAULT_MENU: MenuItem[] = [
  { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },

  {
    label: 'Cadastros',
    icon: 'pi pi-database',
    children: [
      { label: 'Usuários', icon: 'pi pi-users', route: '/usuario' },
    ]
  },

  {
    label: 'Notas Fiscais',
    icon: 'pi pi-file',
    children: [
      { label: 'NFe',  icon: 'pi pi-file-edit', route: '/nfe' },
      { label: 'NFSe', icon: 'pi pi-file-pdf',  route: '/nfse' },
      { label: 'CTe',  icon: 'pi pi-truck',     route: '/cte' },
    ]
  },

  

  {
    label: 'Relatórios',
    icon: 'pi pi-chart-bar',
    route: '/relatorios-confrontos'
  },

  {
    label: 'Auditoria',
    icon: 'pi pi-file',
    children: [
      { label: 'Erros',  icon: 'pi pi-file-edit', route: '/relatorios-errosprocessamento' },
      
    ]
  },

  

  // Ajuda (opcional)
  // {
  //   label: 'Ajuda',
  //   icon: 'pi pi-book',
  //   externalUrl: '/help/html/index.htm',
  //   target: '_blank'
  // },
];

@Injectable({ providedIn: 'root' })
export class MenuService {

  private readonly _items = signal<MenuItem[]>(DEFAULT_MENU);

  /** leitura reativa do menu */
  readonly items = computed(() => this._items());

  /** troca o menu inteiro (multi-tenant, etc.) */
  setItems(items: MenuItem[]) {
    this._items.set(items ?? []);
  }

  /** adiciona itens */
  addItems(...items: MenuItem[]) {
    this._items.update(curr => [...curr, ...items]);
  }

  /** exemplo: filtrar por permissões, se precisar */
  applyPermissions(userRoles: string[] = []) {
    const allow = (perm?: string | string[]) => {
      if (!perm) return true;
      const required = Array.isArray(perm) ? perm : [perm];
      return required.some(r => userRoles.includes(r));
    };
    const deep = (list: MenuItem[]): MenuItem[] =>
      list
        .filter(i => allow(i.permission))
        .map(i => ({ ...i, children: i.children ? deep(i.children) : undefined }))
        .filter(i => i.route || i.externalUrl || i.children?.length || i.separator);

    this._items.set(deep(this._items()));
  }

}

