import { Routes } from '@angular/router';
import { EmpresaPage } from './pages/empresa.page';


export const EMPRESA_ROUTES: Routes = [
  {
    path: '',
    component: EmpresaPage,
    providers: [
      // Guards/Resolvers/Services específicos da feature, se necessário
      // { provide: SOME_TOKEN, useClass: ... }
    ],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', loadComponent: () => import('./components/empresa-list/empresa-list.component').then(m => m.EmpresaListComponent) },
      { path: 'new',  loadComponent: () => import('./components/empresa-form/empresa-form.component').then(m => m.EmpresaFormComponent) },
      { path: ':id',  loadComponent: () => import('./components/empresa-detail/empresa-detail.component').then(m => m.EmpresaDetailComponent) },
    ]
  }
];
