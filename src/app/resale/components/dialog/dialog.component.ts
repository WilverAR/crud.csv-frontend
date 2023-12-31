import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {CalendarModule} from "primeng/calendar";
import {formatDate, NgIf} from "@angular/common";
import {Transaction} from "../../model/transaction";
import {TransactionService} from "../../services/transaction.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {SpeedDialComponent} from "../speed-dial/speed-dial.component";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    DialogModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    FormsModule,
    RippleModule,
    CalendarModule,
    NgIf,
    SpeedDialComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() transactionDialog: boolean = true;
  @Input() submitted: boolean = true;
  @Input() transaction: Transaction = <Transaction>{};
  @Output() onDisplay = new EventEmitter<boolean>();
  @Output() onSubmitted = new EventEmitter<boolean>();

  constructor(private transactionService: TransactionService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  hideDialog() {
    this.onSubmitted.emit(false);
    this.onDisplay.emit(false);
    this.transaction = <Transaction>{};
  }
  saveTransaction(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",

      accept: () => {
        this.submitted = true;

        if (this.isValidForm()) {
          if (this.transaction.id) {
            this.transactionService.update(this.transaction.id, this.transaction).subscribe(() => {
              this.transactionService.getAll().subscribe();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Updated', life: 3000 });
            });
          }
          else {
            this.transactionService.create(this.transaction).subscribe(() => {
              this.transactionService.getAll().subscribe();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Created', life: 3000 });
            });
          }
          this.transactionDialog = false;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid form. Please check your input.', life: 3000 });
        }
      }
    });
  }
  private isValidForm() {
    if (this.transaction.month) {
      this.transaction.month = formatDate(this.transaction.month, 'yyyy-MM', 'en-US');
    }
    if (this.transaction.leaseCommenceDate) {
      this.transaction.leaseCommenceDate = formatDate(this.transaction.leaseCommenceDate, 'yyyy', 'en-US');
    }
    return this.transaction.month && this.transaction.town && this.transaction.flatType && this.transaction.block && this.transaction.streetName && this.transaction.storeyRange && this.transaction.floorAreaSqm && this.transaction.flatModel && this.transaction.leaseCommenceDate && this.transaction.resalePrice;
  }
  onDialogHide() {
    this.hideDialog();
  }
}
