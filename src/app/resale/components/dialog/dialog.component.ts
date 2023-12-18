import {Component, OnInit} from '@angular/core';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    FormsModule,
    RippleModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  /*
  transactionDialog: boolean = true;
  transactions!: Transaction[];
  submitted!: boolean;
  statuses: any;

  constructor(private transactionService: TransactionService) {}
  ngOnInit() {
    this.getTransactions();
  }

  private getTransactions() {
    this.transactionService.getAll().subscribe((response: any) => {
      this.transactions = response;
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

  getSeverity(s: string) {
    return undefined;
  }

  hideDialog() {

  }

  saveProduct() {

  }

   */
}
