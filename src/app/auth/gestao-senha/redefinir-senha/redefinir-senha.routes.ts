import { Routes } from '@angular/router';

import { RecuperaSenhaComponent } from '../recupera-senha/recupera-senha.component';
import { RedefinirSenhaComponent } from './redefinir-senha.component';



export const REDEFINIR_SENHA_ROUTES: Routes = [
  {
    path: '',
    component: RedefinirSenhaComponent
  }
];

