import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';

import { heroHome, heroCog6Tooth } from '@ng-icons/heroicons/outline';
import { lucideMenu, lucideChevronDown } from '@ng-icons/lucide';
import { tablerReportAnalytics, tablerFileDollar } from '@ng-icons/tabler-icons';

import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
//import Aura from 'primeng/themes/aura';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    ConfirmationService,
    MessageService,
    CookieService,
    
  ]
};
