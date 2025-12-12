// src/app/vetorit.preset.ts

import Lara from '@primeuix/themes/lara';
import { definePreset } from '@primeuix/themes';

export const VetorItPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50:  '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '#0A285F',   // azul principal VetorIT
      600: '#123B85',   // hover
      700: '#061B3F',   // active
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    },

    // Cor secundária da VetorIT (laranja) — usada para badges, highlights, accents
    accent: {
      50:  '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '#E1742E',   // Laranja principal VetorIT
      600: '#C76322',   // hover escuro
      700: '#A9541C',   // active
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}',
    },

    // Ajuste opcional — substitui o verde padrão de "success" pelo azul VetorIT
    success: {
      500: '#0A285F'
    }
  }
});
