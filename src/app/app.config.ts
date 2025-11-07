import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';

import { heroHome, heroCog6Tooth } from '@ng-icons/heroicons/outline';
import { lucideMenu, lucideChevronDown } from '@ng-icons/lucide';
import { tablerReportAnalytics, tablerFileDollar } from '@ng-icons/tabler-icons';
import { APP_ICONS } from './icons/icons.registry';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { tokenInterceptor } from './core/interceptors/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    //provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideIcons({
      heroHome,
      heroCog6Tooth,
      lucideMenu,
      lucideChevronDown,
      tablerReportAnalytics,
      tablerFileDollar
    }),
    provideIcons(APP_ICONS),
    ConfirmationService,
    MessageService,
    CookieService,
    
  ]
};
