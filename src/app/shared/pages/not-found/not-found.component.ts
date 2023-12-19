import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  route: string;

  constructor(private routeInfo: ActivatedRoute) {
    this.route = this.routeInfo.snapshot.url.join('/');
  }
}
