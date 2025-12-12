import { inject, Injectable } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { primeNgPtBR } from '../../primeng-ptBR';

@Injectable({
  providedIn: 'root'
})
export class PrimengLocaleService {

  constructor() { }

  private prime = inject(PrimeNG);

  init() {
    this.prime.setTranslation(primeNgPtBR);
  }

}
