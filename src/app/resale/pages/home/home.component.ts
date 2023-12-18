import {Component} from '@angular/core';
import {TableComponent} from "../../components/table/table.component";
import {TableModule} from "primeng/table";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {DialogComponent} from "../../components/dialog/dialog.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableComponent,
    TableModule,
    ToolbarComponent,
    DialogComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
