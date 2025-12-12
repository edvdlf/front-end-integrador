import { AbstractControl, ValidationErrors } from "@angular/forms";

export function isValidCnpj(value: string): boolean {
  const cnpj = value.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calcDV = (base: string) => {
    let soma = 0, pos = base.length - 7;
    for (let i = base.length; i >= 1; i--) {
      soma += parseInt(base.charAt(base.length - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }
    const mod = soma % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const dv1 = calcDV(cnpj.substring(0, 12));
  if (dv1 !== parseInt(cnpj.charAt(12), 10)) return false;

  const dv2 = calcDV(cnpj.substring(0, 13));
  if (dv2 !== parseInt(cnpj.charAt(13), 10)) return false;

  return true;
}

export function cnpjsArrayValidator() {
  const onlyDigits14 = /^\d{14}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const arr = control.value as string[]; // já é não-nulo
    if (!Array.isArray(arr)) return { tipoInvalido: true };
    if (arr.length === 0) return null; // ok vazio (ajuste se quiser exigir)
    // normaliza
    const norm = arr.map((x) => (x ?? '').replace(/\D+/g, ''));
    const invalid = norm.find((x) => !onlyDigits14.test(x));
    if (invalid) return { cnpjInvalido: invalid };
    const set = new Set(norm);
    if (set.size !== norm.length) return { duplicado: true };
    return null;
  };
}



