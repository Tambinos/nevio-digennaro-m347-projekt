import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatButton
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
