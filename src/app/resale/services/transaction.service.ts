import { Injectable } from '@angular/core';
import { HttpBaseService } from "../../shared/services/http-base.service";
import { Transaction } from "../model/transaction";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends HttpBaseService<Transaction> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/transactions';
  }
}
