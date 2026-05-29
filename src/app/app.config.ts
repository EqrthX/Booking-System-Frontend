import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideToastr({      // 3. ตั้งค่า Toastr
      timeOut: 3000,     // ให้แสดง 3 วินาทีแล้วหายไป
      positionClass: 'toast-bottom-right', // โผล่มาจากมุมขวาล่าง จะได้ไม่บัง UI
      preventDuplicates: true, // ป้องกันการเด้งซ้ำรัวๆ
    }),
  ]
};
