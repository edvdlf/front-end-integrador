// src/app/shared/utils/app-utils.ts
export class AppUtils {
  /**
   * Mantém apenas dígitos (0-9).
   */
  static onlyDigits(s: string | null | undefined): string {
    return (s ?? '').replace(/\D+/g, '');
  }

  /**
   * Remove duplicados, preservando a ordem do primeiro encontro.
   */
  static unique<T>(arr: T[] | null | undefined): T[] {
    if (!arr || arr.length === 0) return [];
    return Array.from(new Set(arr));
  }

  /**
   * Converte Date, string ISO ou dd/mm/yy(yy) para 'YYYY-MM-DD'.
   * Evita alteração de data por fuso (usa componentes locais).
   * Retorna null se não conseguir interpretar.
   */
  static toYmd(d: unknown): string | null {
    if (!d) return null;

    // 1) Date válido
    if (d instanceof Date && !isNaN(d.getTime())) {
      return AppUtils.#formatLocalYmd(d);
    }

    // 2) Tenta string ISO ou algo que o Date aceite
    if (typeof d === 'string' || typeof d === 'number') {
      const tryIso = new Date(d as any);
      if (!isNaN(tryIso.getTime())) {
        return AppUtils.#formatLocalYmd(tryIso);
      }

      // 3) Tenta dd/mm/yy(yy)
      const m = String(d).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
      if (m) {
        const [, ddStr, mmStr, yyyyStr] = m;
        const year = yyyyStr.length === 2 ? Number(`20${yyyyStr}`) : Number(yyyyStr);
        const month = Number(mmStr) - 1; // 0-11
        const day = Number(ddStr);
        const js = new Date(year, month, day);
        if (!isNaN(js.getTime())) {
          // Confere se bate (para evitar '31/02' virar data inválida ajustada)
          if (
            js.getFullYear() === year &&
            js.getMonth() === month &&
            js.getDate() === day
          ) {
            return AppUtils.#formatLocalYmd(js);
          }
        }
      }
    }

    return null;
  }

  /**
   * Converte para número ou retorna null se não for finito.
   */
  static toNumberOrNull(v: unknown): number | null {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  // --------- privados ---------
  static #pad2(n: number): string {
    return String(n).padStart(2, '0');
  }

  /**
   * Formata 'YYYY-MM-DD' usando os componentes **locais** do Date,
   * evitando mudanças de dia por UTC.
   */
  static #formatLocalYmd(d: Date): string {
    const y = d.getFullYear();
    const m = AppUtils.#pad2(d.getMonth() + 1);
    const day = AppUtils.#pad2(d.getDate());
    return `${y}-${m}-${day}`;
  }
}
