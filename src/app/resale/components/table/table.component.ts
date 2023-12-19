import {Component, Input} from '@angular/core';
import {TableModule} from "primeng/table";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Transaction} from "../../model/transaction";
import {TransactionService} from "../../services/transaction.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogComponent} from "../dialog/dialog.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";


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
    NgIf,
    DialogComponent,
    ConfirmDialogModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() transactions: Transaction[] = [];
  @Input() columns: Column[] = [];
  @Input() exportColumns!: ExportColumn[];
  @Input() loading: boolean = true;

  transactionDialog: boolean = false;
  submitted: boolean = false;
  first: number = 0;
  rows: number = 5;
  totalRecords: number = this.transactions.length;
  transaction!: Transaction;

  constructor(private transactionService: TransactionService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
  }
  editProduct(transaction: any) {
    this.transaction = { ...transaction };
    this.transactionDialog = true;
  }
  deleteProduct(transactionId: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.transactionService.delete(transactionId).subscribe(() => {
          this.transactionService.getAll().subscribe();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Deleted', life: 3000 });
        });
      },
      reject: () => {
        this.transactionDialog = false;
      }
    });
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
  }
}
