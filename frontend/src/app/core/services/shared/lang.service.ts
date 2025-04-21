import { Constants } from '@/shared/enums/constants';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LangService {
    private appLangueKey = 'ORDERLY-LANGUAGE-CHOSEN';
    private language = signal('en');
    words = computed(() => this.language() == 'en' ? Constants : Constants);
    setEnglish() {
        this.language.set('en');
        localStorage.setItem(this.appLangueKey, 'en');
    }
    setSpanish() {
        this.language.set('es');
        localStorage.setItem(this.appLangueKey, 'es');
    }
    setDeutch() {
        this.language.set('de');
        localStorage.setItem(this.appLangueKey, 'de');
    }
}