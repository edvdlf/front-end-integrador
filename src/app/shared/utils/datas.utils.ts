import { AbstractControl, ValidationErrors } from "@angular/forms";

export function dateRangeValidator(
  dataInicialKey: string,
  dataFinalKey: string
) {
  return (group: AbstractControl): ValidationErrors | null => {
    const di = group.get(dataInicialKey)?.value;
    const df = group.get(dataFinalKey)?.value;
    if (!di || !df) return null;

    // se forem strings ISO "YYYY-MM-DD"
    const ini = new Date(di);
    const fin = new Date(df);
    if (isNaN(ini.getTime()) || isNaN(fin.getTime()))
      return { dataInvalida: true };
    if (ini > fin) return { intervaloInvalido: true };
    return null;
  };
}
