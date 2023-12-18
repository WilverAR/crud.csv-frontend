import {Component, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TableModule} from "primeng/table";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FileUploadModule} from "primeng/fileupload";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {SpeedDialModule} from "primeng/speeddial";
import {CalendarModule} from "primeng/calendar";
import {KeyFilterModule} from "primeng/keyfilter";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Transaction} from "../../model/transaction";
import {TransactionService} from "../../services/transaction.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogComponent} from "../dialog/dialog.component";


interface Column {
  field: string;
  header: string;
}
interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    NgForOf,
    PaginatorModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    FileUploadModule,
    ToolbarModule,
    DialogModule,
    InputTextModule,
    NgIf,
    SpeedDialModule,
    CalendarModule,
    KeyFilterModule,
    InputTextareaModule,
    DialogComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];
  @Input() columns: Column[] = [];
  @Input() exportColumns!: ExportColumn[];
  first: number = 0;
  rows: number = 5;

  @Input() totalRecords: number = this.transactions.length;
  transactionDialog: boolean = false;
  submitted: boolean = false;
  transaction!: Transaction;
  @Input() loading: boolean = true;

  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
  }
  constructor(private transactionService: TransactionService, private messageService: MessageService) { }

  ngOnChanges(changes:SimpleChanges) {
    console.log('Changes: ', changes);
    this.totalRecords = this.transactions.length;
  }
  editProduct(transaction: any) {
    this.transaction = { ...transaction };
    console.log('Transaction: ', transaction);
    this.transactionDialog = true;
  }
  deleteProduct(transaction: any) {
    this.transaction = { ...transaction };
    this.transactionService.delete(this.transaction.id).subscribe((response: any) => {
      console.log('Response: ', response);
    });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
  }

  onDisplayDialog($event: boolean) {
    this.transactionDialog = $event;
  }

  onSubmittedDialog($event: boolean) {
    this.submitted = $event;
  }

  onDisplay() {
    this.transaction = <Transaction>{};
    this.transactionDialog = true;
    console.log('Transaction Dialog: ', this.transactionDialog);
  }
}
