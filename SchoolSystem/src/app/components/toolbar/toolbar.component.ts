import {Component} from '@angular/core';
import {LanguageService} from "../../services/language.service";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor() {

  }

  protected readonly window = window;
}
