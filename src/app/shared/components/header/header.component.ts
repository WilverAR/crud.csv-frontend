import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {AvatarModule} from "primeng/avatar";
import {ToolbarModule} from "primeng/toolbar";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    InputTextModule,
    AvatarModule,
    ToolbarModule
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
