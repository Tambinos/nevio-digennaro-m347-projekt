import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages: string[] = ['English','Deutsch','Francais'];
  selectedLanguage: string = 'Deutsch';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.languageConverter(this.selectedLanguage));
  }
  languageConverter(language: string): string {
    switch (language) {
      case 'English':
        return 'en';
      case 'Deutsch':
        return 'de';
      case 'Francais':
        return 'fr';
      case '-- --- .-. ... . / -.-. --- -.. .':
        return 'mc';
      case '😀📧🔣❗':
        return 'ej';
      default:
        return 'en';
    }
  }
  switchLanguage(language: string) {
    this.translate.use(this.languageConverter(language));
  }

}
