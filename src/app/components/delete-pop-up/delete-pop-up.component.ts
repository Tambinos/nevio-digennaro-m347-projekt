import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.scss']
})
export class DeletePopUpComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    console.log(this.data)
  }

  onDecide(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
