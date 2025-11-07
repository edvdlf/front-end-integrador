// Escolha só os ícones que quer no app:
import { heroHome, heroUsers } from '@ng-icons/heroicons/outline';
import { lucideMenu } from '@ng-icons/lucide';
import {
  tablerDatabase, tablerBuilding, tablerReportAnalytics,
  tablerChartBar, tablerReceiptTax, tablerBook
} from '@ng-icons/tabler-icons';

// Objeto único com todos os ícones do app
export const APP_ICONS = {
  heroHome,
  heroUsers,
  lucideMenu,
  tablerDatabase,
  tablerBuilding,
  tablerReportAnalytics,
  tablerChartBar,
  tablerReceiptTax,
  tablerBook,
} as const;
