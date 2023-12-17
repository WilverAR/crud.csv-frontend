import { Component } from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    ToolbarModule,
    FileUploadModule,
    RippleModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  Delete: any;
  selectedProducts: any | boolean;

  openNew() {

  }

  deleteSelectedProducts() {

  }
}
