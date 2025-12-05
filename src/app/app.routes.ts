import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { RecuperaSenhaComponent } from './auth/gestao-senha/recupera-senha/recupera-senha.component';
import { RedefinirSenhaComponent } from './auth/gestao-senha/redefinir-senha/redefinir-senha.component';

export const routes: Routes = [
  // 1) Sempre cair no login ao acessar "/"
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // 2) /login acessível; se já logado, manda para /dashboard
  { path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.default),
    //canActivate: [redirectIfAuthenticatedGuard]
  },
 {
  path: 'recuperar-senha',
  component: RecuperaSenhaComponent,
},

 {
  path: 'redefinir-senha',
  component: RedefinirSenhaComponent,
},


  // 3) Shell protegido
  {
    path: '',
    component: LayoutComponent,
    //canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
      { path: 'usuario',   loadChildren: () => import('./modules/cadastros/usuario/usuario.routes').then(m => m.USUARIO_ROUTES) },
      { path: 'cte',    loadChildren: () => import('./modules/consultas/cte/cte.routes').then(m => m.CTE_ROUTES) },
      { path: 'nfe',    loadChildren: () => import('./modules/consultas/nfe/nfe.routes').then(m => m.NFE_ROUTES) },
      { path: 'nfse',    loadChildren: () => import('./modules/consultas/nfse/nfse.routes').then(m => m.NFSE_ROUTES) },
      { path: 'relatorios-confrontos',    loadChildren: () => import('./modules/relatorios/confrontos/relatorios.routes').then(m => m.RELATORIOS_CONFRONTOS_ROUTES) },
      { path: 'relatorios-errosprocessamento',    loadChildren: () => import('./modules/relatorios/logs/errosprocessamento.routes').then(m => m.ERROS_PROCESSAMENTO_ROUTES) },
      { path: 'alterar-senha',   loadChildren: () => import('./auth/gestao-senha/altera-senha/altera-senha.routes').then(m => m.ALTERA_SENHA_ROUTES) },
    ]
  },

  // 4) Qualquer outra rota inválida → login
  { path: '**', redirectTo: 'login' },
];
