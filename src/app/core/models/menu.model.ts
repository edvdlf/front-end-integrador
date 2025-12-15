// menu.model.ts
export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  externalUrl?: string;
  badge?: number | string;
  children?: MenuItem[];
  permission?: string | string[];
  separator?: boolean;
  target?: string;
}

export const USUARIO_NORMAL_MENU: MenuItem[] = [
  { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
  {
    label: 'Documentos Fiscais',
    icon: 'pi pi-file',
    children: [
      { label: 'NFe', icon: 'pi pi-file-edit', route: '/nfe' },
      { label: 'NFSe', icon: 'pi pi-file-pdf', route: '/nfse' },
      { label: 'CTe', icon: 'pi pi-truck', route: '/cte' },
    ],
  },
  {
    label: 'Relatórios',
    icon: 'pi pi-chart-bar',
    children: [
      { label: 'Confrontos', icon: 'pi pi-file-edit', route: '/relatorios-confrontos' },
      { label: 'Erros', icon: 'pi pi-file-edit', route: '/relatorios-errosprocessamento' },
    ],
  },
  { label: 'Ajuda', icon: 'pi pi-book', externalUrl: '/help/html/VisaoGeral.html', target: '_blank' },
];

export const USUARIO_ADMIN_MENU: MenuItem[] = [
  { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
  {
    label: 'Cadastros',
    icon: 'pi pi-database',
    children: [{ label: 'Usuários', icon: 'pi pi-users', route: '/usuario' }],
  },
  {
    label: 'Documentos Fiscais',
    icon: 'pi pi-file',
    children: [
      { label: 'NFe', icon: 'pi pi-file-edit', route: '/nfe' },
      { label: 'NFSe', icon: 'pi pi-file-pdf', route: '/nfse' },
      { label: 'CTe', icon: 'pi pi-truck', route: '/cte' },
    ],
  },
  {
    label: 'Relatórios',
    icon: 'pi pi-chart-bar',
    children: [
      { label: 'Confrontos', icon: 'pi pi-file-edit', route: '/relatorios-confrontos' },
      { label: 'Erros', icon: 'pi pi-file-edit', route: '/relatorios-errosprocessamento' },
    ],
  },
  {
    label: 'Adm',
    icon: 'pi pi-lock',
    children: [{ label: 'Recuperar documentos', icon: 'pi pi-sync', route: '/recuperar-documentos' }],
  },
  { label: 'Ajuda', icon: 'pi pi-book', externalUrl: '/help/html/VisaoGeral.html', target: '_blank' },
];
