import {Component, OnInit} from '@angular/core';
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Transaction} from "../../model/Transaction";
import {TransactionService} from "../../services/transaction.service";
import {NgForOf} from "@angular/common";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    SharedModule,
    TableModule,
    NgForOf,
    PaginatorModule,
    ToastModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  transactions: Transaction[] = [];
  cols: Column[] = [];
  first: number = 0;
  rows: number = 5;
  totalRecords: number = 0;
  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.getAllTransactions();
  }

  private getAllTransactions() {
    this.transactionService.getAll().subscribe((response: any) => {
      this.transactions = response;
      this.totalRecords = this.transactions.length;
    });
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'month', header: 'Month' },
      { field: 'town', header: 'Town' },
      { field: 'flatType', header: 'Flat Type' },
      { field: 'block', header: 'Block' },
      { field: 'streetName', header: 'Street Name' },
      { field: 'storeyRange', header: 'Storey Range' },
      { field: 'floorAreaSqm', header: 'Floor Area Sqm' },
      { field: 'flatModel', header: 'Flat Model' },
      { field: 'leaseCommenceDate', header: 'Lease Commence Date' },
      { field: 'resalePrice', header: 'Resale Price' }
    ];
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    console.log('Event: ', event);
  }

  editProduct(product: any) {

  }

  deleteProduct(product: any) {

  }
}
