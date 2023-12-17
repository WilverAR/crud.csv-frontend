import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import { Transaction } from '../../model/Transaction';
import { TransactionService } from '../../service/transactionService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  transactions!: Transaction[];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getAllTransactions().then((data) => {
      this.transactions = data;
    });
  }
}
