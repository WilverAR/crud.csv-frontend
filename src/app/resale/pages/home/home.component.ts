import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TableComponent} from "../../components/table/table.component";
import {TableModule} from "primeng/table";
import {DialogComponent} from "../../components/dialog/dialog.component";
import {Transaction} from "../../model/transaction";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {TransactionService} from "../../services/transaction.service";
import {SpeedDialModule} from "primeng/speeddial";
import {ToastModule} from "primeng/toast";
import {SpeedDialComponent} from "../../components/speed-dial/speed-dial.component";


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableComponent,
    TableModule,
    DialogComponent,
    SpeedDialModule,
    ToastModule,
    SpeedDialComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit {
  transactions: Transaction[] = [];
  columns: Column[] = [];
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(private transactionService: TransactionService, private messageService: MessageService) { }

  ngOnInit() {
    this.getAllTransactions();
  }
  private getAllTransactions() {
    this.transactionService.getAll().subscribe((response: any) => {
      this.transactions = response;
      this.totalRecords = this.transactions.length;
      this.loading = false;
    });
    this.columns = [
      { field: 'id', header: 'Id' },
      { field: 'month', header: 'Month' },
      { field: 'town', header: 'Town' },
      { field: 'flatType', header: 'Flat Type' },
      { field: 'block', header: 'Block' },
      { field: 'streetName', header: 'Street Name' },
      { field: 'storeyRange', header: 'Storey Range' },
      { field: 'floorAreaSqm', header: 'Floor Area Sqm' },
      { field: 'flatModel', header: 'Flat Model' },
      { field: 'leaseCommenceDate', header: 'Lease Commence' },
      { field: 'resalePrice', header: 'Resale Price' }
    ];
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Loaded', life: 3000 });
  }
}
