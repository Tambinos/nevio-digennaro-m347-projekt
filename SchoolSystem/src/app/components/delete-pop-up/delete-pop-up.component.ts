import {Component, EventEmitter, Output} from '@angular/core';
import {LanguageService} from "../../services/language.service";


@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.scss']
})
export class DeletePopUpComponent {
  @Output() decision:EventEmitter<boolean> = new EventEmitter<boolean>();
  parent:string = ''
  constructor(languageService: LanguageService) {
    this.parent = window.parent.location.href.substring(window.parent.location.href.lastIndexOf('/'), window.parent.location.href.length);
  }
  onDecide(decision: boolean): void {
    this.decision.emit(decision);
  }
}
