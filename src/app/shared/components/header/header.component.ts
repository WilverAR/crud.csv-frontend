import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    InputTextModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Manage Transactions',
      }
    ];
  }
}
