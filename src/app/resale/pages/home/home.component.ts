import {Component, OnInit} from '@angular/core';
import {TableComponent} from "../../components/table/table.component";
import {Transaction} from "../../model/transaction";
import {ConfirmationService, MessageService} from "primeng/api";
import {TransactionService} from "../../services/transaction.service";
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
  loading: boolean = true;

  constructor(private transactionService: TransactionService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadData();
    this.getAllTransactions();
  }
  private loadData() {
    this.transactionService.data$.subscribe(data => {
      this.transactions = data;
    });
  }
  private getAllTransactions() {
    this.transactionService.getAll().subscribe((data) => {
      this.loading = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Loaded', life: 3000 });
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
  }
}
